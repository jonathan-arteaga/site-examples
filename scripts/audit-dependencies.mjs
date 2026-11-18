import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const knownAdvisory = "GHSA-vfj7-8cjw-p6xm";
const picomatchAdvisory = "GHSA-fc5q-39xc-vjpf";
// SHA-256 of the installed parser with the repeating-extglob guard applied.
const patchedParserDigests = new Map([
  ["2.3.2", "d4df627557d92486278542b61cfd4f2154ac8456e53191a833ad7f8678abcb43"],
  ["4.0.7", "a795be9197adb6a4aa1aed5c25a5514b21a3e82a397ae75cd533d1eb34fe1501"],
]);

export function reviewAudit(report, verifiedPicomatchVersions = new Set()) {
  if (!report || typeof report.advisories !== "object" || report.advisories === null ||
      Array.isArray(report.advisories) || !report.metadata?.vulnerabilities) {
    throw new Error("Dependency audit did not return a valid advisory report");
  }
  const exceptions = [];
  const unexpected = [];
  for (const advisory of Object.values(report.advisories)) {
    const findings = advisory.findings;
    const knownDevelopmentException = advisory.github_advisory_id === knownAdvisory &&
      advisory.module_name === "braces" && advisory.severity === "high" &&
      Array.isArray(findings) && findings.length > 0 &&
      findings.every((finding) => finding.dev === true && finding.version === "3.0.3");
    const verifiedPicomatchPatch = advisory.github_advisory_id === picomatchAdvisory &&
      advisory.module_name === "picomatch" && advisory.severity === "high" &&
      Array.isArray(findings) && findings.length > 0 &&
      findings.every((finding) => finding.dev === true && patchedParserDigests.has(finding.version) &&
        verifiedPicomatchVersions.has(finding.version));
    (knownDevelopmentException || verifiedPicomatchPatch ? exceptions : unexpected).push(advisory);
  }
  const counts = Object.values(report.metadata.vulnerabilities);
  if (counts.length === 0 || counts.some((value) => !Number.isInteger(value) || value < 0)) {
    throw new Error("Dependency audit contains invalid vulnerability counts");
  }
  const count = counts.reduce((sum, value) => sum + value, 0);
  if ((count > 0) !== (exceptions.length + unexpected.length > 0)) {
    throw new Error("Dependency audit counts do not match its advisory report");
  }
  return { exceptions, unexpected };
}

function verifyInstalledPicomatchPatches() {
  const listing = spawnSync("pnpm", ["list", "-r", "--depth", "Infinity", "--json", "picomatch"], {
    encoding: "utf8", timeout: 60000, maxBuffer: 10 * 1024 * 1024,
  });
  if (listing.error || listing.status !== 0) throw new Error("Unable to list installed picomatch dependencies");
  const roots = JSON.parse(listing.stdout);
  const verifiedVersions = new Set();
  const verifiedPaths = new Set();

  function visit(dependency) {
    if (dependency.from === "picomatch" && !verifiedPaths.has(dependency.path)) {
      const manifest = JSON.parse(readFileSync(join(dependency.path, "package.json"), "utf8"));
      const parser = readFileSync(join(dependency.path, "lib", "parse.js"));
      const digest = createHash("sha256").update(parser).digest("hex");
      if (manifest.name !== "picomatch" || digest !== patchedParserDigests.get(manifest.version)) {
        throw new Error(`Installed picomatch ${manifest.version} does not match its reviewed local patch`);
      }
      verifiedVersions.add(manifest.version);
      verifiedPaths.add(dependency.path);
    }
    for (const group of ["dependencies", "devDependencies", "optionalDependencies"]) {
      for (const child of Object.values(dependency[group] ?? {})) visit(child);
    }
  }

  for (const root of roots) visit(root);
  return verifiedVersions;
}

async function main() {
  const audit = spawnSync("pnpm", ["audit", "--json"], { encoding: "utf8", timeout: 60000, maxBuffer: 10 * 1024 * 1024 });
  if (audit.error || ![0, 1].includes(audit.status)) throw new Error(audit.error?.message || audit.stderr || "Audit command failed");
  const report = JSON.parse(audit.stdout);
  const initialReview = reviewAudit(report);
  const hasPicomatchAdvisory = initialReview.unexpected.some(
    (advisory) => advisory.github_advisory_id === picomatchAdvisory,
  );
  const { exceptions, unexpected } = hasPicomatchAdvisory
    ? reviewAudit(report, verifyInstalledPicomatchPatches())
    : initialReview;
  for (const advisory of unexpected) console.error(`${advisory.severity}: ${advisory.module_name} — ${advisory.github_advisory_id}`);
  if (unexpected.length) throw new Error(`${unexpected.length} dependency advisories need review`);
  if (exceptions.some((advisory) => advisory.github_advisory_id === knownAdvisory)) {
    const response = await fetch("https://registry.npmjs.org/braces/latest", { signal: AbortSignal.timeout(10000) });
    if (!response.ok) throw new Error("Unable to check the braces upstream release");
    const latest = await response.json();
    if (latest.version !== "3.0.3") throw new Error(`braces upstream changed to ${latest.version}; review the temporary exception`);
    console.warn(`Known development exception: braces 3.0.3 (${knownAdvisory}); upstream still has no published replacement. GitHub alerts remain enabled.`);
  }
  if (exceptions.some((advisory) => advisory.github_advisory_id === picomatchAdvisory)) {
    const response = await fetch("https://registry.npmjs.org/picomatch/latest", { signal: AbortSignal.timeout(10000) });
    if (!response.ok) throw new Error("Unable to check the picomatch upstream release");
    const latest = await response.json();
    if (latest.version !== "4.0.7") throw new Error(`picomatch upstream changed to ${latest.version}; review the local patch`);
    console.warn(`Known development advisory: picomatch (${picomatchAdvisory}); verified the local parser patches. GitHub alerts remain enabled.`);
  }
  console.log(`Full dependency audit: ${unexpected.length} unexpected advisories; ${exceptions.length} reviewed advisory exceptions.`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch((error) => { console.error(error.message); process.exitCode = 1; });
}
