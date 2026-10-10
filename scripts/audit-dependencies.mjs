import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const knownAdvisory = "GHSA-vfj7-8cjw-p6xm";

export function reviewAudit(report) {
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
    (knownDevelopmentException ? exceptions : unexpected).push(advisory);
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

async function main() {
  const audit = spawnSync("pnpm", ["audit", "--json"], { encoding: "utf8", timeout: 60000, maxBuffer: 10 * 1024 * 1024 });
  if (audit.error || ![0, 1].includes(audit.status)) throw new Error(audit.error?.message || audit.stderr || "Audit command failed");
  const { exceptions, unexpected } = reviewAudit(JSON.parse(audit.stdout));
  for (const advisory of unexpected) console.error(`${advisory.severity}: ${advisory.module_name} — ${advisory.github_advisory_id}`);
  if (unexpected.length) throw new Error(`${unexpected.length} dependency advisories need review`);
  if (exceptions.length) {
    const response = await fetch("https://registry.npmjs.org/braces/latest", { signal: AbortSignal.timeout(10000) });
    if (!response.ok) throw new Error("Unable to check the braces upstream release");
    const latest = await response.json();
    if (latest.version !== "3.0.3") throw new Error(`braces upstream changed to ${latest.version}; review the temporary exception`);
    console.warn(`Known development exception: braces 3.0.3 (${knownAdvisory}); upstream still has no published replacement. GitHub alerts remain enabled.`);
  }
  console.log(`Full dependency audit: ${unexpected.length} unexpected advisories; ${exceptions.length} visible upstream exception.`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch((error) => { console.error(error.message); process.exitCode = 1; });
}
