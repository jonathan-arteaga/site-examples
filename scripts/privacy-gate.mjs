#!/usr/bin/env node
import sharp from 'sharp';

import { createHash } from 'node:crypto';
import {
  existsSync,
  lstatSync,
  readdirSync,
  readFileSync,
} from 'node:fs';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = process.cwd();
const args = new Set(process.argv.slice(2));
const prohibitedDirectoryViolations = [];

const ignoredDirectoryNames = new Set([
  '.git',
  '.pnpm-store',
  '.turbo',
  '.next',
  '.vercel',
  'node_modules',
  'playwright-report',
  'test-results',
]);

const forbiddenWordRules = [
  { label: 'client-org', words: 1, hash: 'f9c685999a0fb75c8f57a64500da20587fa742d5a0c154e18ae089678e7e5254' },
  { label: 'client-package', words: 1, hash: '1a7f1b927f5de1055327fb76cc1bf7224d684c06dc56805f95c5f3c0edea3c7f' },
  { label: 'property-1', words: 1, hash: 'a62ee5ab3e8914010c0f75ff149f9415c839c64ccf4d8ed91d13b456dbc1d813' },
  { label: 'property-2', words: 1, hash: 'b0827c117934f38f6cbf7cf4125edb36aa049022d4e99b03a2f29e8652c0ea97' },
  { label: 'property-3', words: 1, hash: '984c6af0afbab0b58bdd7922d2b785a978d181b0e1843324df6eb1b6cdc91cad' },
  { label: 'property-4', words: 1, hash: 'ea04a2daa12682f996ba22f891bae57302241ec8df3dfc4ab37cc13b3636d39e' },
  { label: 'client-city-1', words: 1, hash: 'fa2115f8d576a6ab722956697fc759c31d1cd6b93c8336bfebf73ed5cba2ff49' },
  { label: 'client-city-2', words: 1, hash: '31bba0b69e94c90cfa7eec91222c770595748163573833cbe3589408ad5f64a7' },
  { label: 'client-city-3', words: 1, hash: 'c323fce25cd1e902d55313c12cb4575d007c10d141700b05964b61ff4275a023' },
  { label: 'client-region', words: 1, hash: 'f65375409d7351f4defb632925e2782543c8624c38c31cf1bb7a2e8d84b79e3e' },
  { label: 'client-county-1', words: 2, hash: 'a835ab171fc9c85d8bd5ea85843f198fa858f5422dec14c5e9bec0c590b71749' },
  { label: 'client-county-2', words: 2, hash: '888d60afb61e073770f613d5f3f601f9f65ed179f614441c5927bc0bccbde2f8' },
  { label: 'client-county-3', words: 2, hash: 'e9cb27efb15d72a821fb8d6b09a397e56a1c69a3b6a7de1fa71a76985b621dfd' },
  { label: 'street-1', words: 1, hash: '27511e620b42e8fbec37edf4bfc765d490f326137a40a51837184f61b8aae39f' },
  { label: 'street-2', words: 1, hash: '2b0d221ea282a3ba40c2c95983b6e332ada542a12527d2f7892ad1680e3ca94a' },
  { label: 'street-3', words: 1, hash: 'e56694bee3084ebe1c2fd941838fb65cd2e4524e1d909d54d27560004df23198' },
  { label: 'street-4', words: 1, hash: 'c5508df96097559eba53e0301aaf688926e0c3c6c5568883defcc6823b6c9e3f' },
  { label: 'street-5', words: 1, hash: '73cce42f1f0e9099688b8eb6294f7a9963c937a8e47315ccb759f499ada648d9' },
  { label: 'metadata-email-token', words: 1, hash: '634a94b72ab35a64b5648080d210e275116aaee4d96e225ad35c1a4b6e3a909e' },
  { label: 'integration-1', words: 1, hash: 'e459bb89f8caa9528e47d445a2665fbe7b530b5029d61fd215e14fff7b438589' },
  { label: 'integration-2', words: 1, hash: '6de1be36afd7a16d2e4fb5043e9214d437f65e48eacaaf9f3ab284bc62c0dd06' },
  { label: 'integration-3', words: 1, hash: '99d211b2dd6f2f4ff227e4128c27483d93823c9cd294a297df7b211455075d68' },
  { label: 'integration-4', words: 1, hash: '5d4af77e174e251416325257b3e11775d546d8cf1a6a44c0fef59066d7ee179c' },
  { label: 'integration-5', words: 2, hash: '0fe9a70dbe802f28d458e7526a3364ea236c4bf67cdb60f0c02ee983920c4d08' },
  { label: 'integration-6', words: 1, hash: 'c3b0a945be60f0d14413f68601cba6a16e40462378b68195f19a5b52954a2a9f' },
  { label: 'integration-7', words: 2, hash: '227d712732a30555ffa0d5bf0fbccedcb78424289b70779b5e20df0e1d91464c' },
  { label: 'source-repository-name', words: 2, hash: 'c9142c5adf790b9a50d941520355ed939f8c3e277d4a3799f566584b9e3497ce' },
  { label: 'client-company-name', words: 2, hash: '4d7890028467d06519fdbb80b7f4688380947fbcc1f70ad983280cdd513fa9f6' },
  { label: 'client-region-name', words: 3, hash: 'f953d724b5c54f580045225719293f12c8b29fdc44eee7666751fd6e4fe0296c' },
];

const forbiddenNumberRules = [
  { label: 'phone-corporate', hash: '4746de8c533fe59ba14cbd05a06d14d95d0f29f79c0261f43c952f02497d7ea1' },
  { label: 'phone-property-1', hash: 'f2e218a4d9812a3aae6339844ce613c6b7479781267c43b3309ec99301f13b54' },
  { label: 'phone-property-2', hash: '4c02ba3f16fcd047e4c643336473548a73ecb40c341fdc2a733076b24155e56e' },
  { label: 'phone-property-3', hash: '0f3ccfad14ccc3b17a244711ddb0a99b855f6375c006004a3be2f4fc1c5272a9' },
  { label: 'phone-property-4', hash: '30e9bc286f6cb36bb0fa26d5295b23efae23c5d59cd842c8d4636af66aee5a7d' },
  { label: 'zip-corporate', hash: 'fe9c23106fc09215d04a53bfa0644108b9cb5e3b2e34c128c2d9d6b36fdf2a9a' },
  { label: 'zip-property-1', hash: '925dfe119b2ef93c7053df75e9ea70549e91bb991843da65a280e64aad65d1a5' },
  { label: 'zip-property-2', hash: '8cf9214e80fa37836479cda7a6348e387ed3df73cf54a0c8469dfd04390f3baa' },
  { label: 'zip-property-3', hash: '58e215659d80d962fab8a474fd786ab0f9b6725d8b2c7c476f21c190eee60b47' },
  { label: 'zip-property-4', hash: 'ec2163be05eab497abf7af5e82c9b48a7182800bf838dda822803cb43a0de394' },
  { label: 'coordinate-1', hash: 'b76a9b24f27c99014b670a5f488dccd98bf1c01fe25648ee77dcd2d3a53c7104' },
  { label: 'coordinate-2', hash: 'b01f51f2c280bfe3a43e6b93987b8905826d934f42a77154ac901dd8774fac8e' },
  { label: 'coordinate-3', hash: '1cf5fb5ae3fffdf95e3221fd3987ef9dfe97e88e6d97ddc6baee6dfa6d40ce67' },
  { label: 'coordinate-4', hash: 'df74bc654d325c599c7a10cd4c2b495beedfa8478756d3d317ceaadc7f4a1970' },
  { label: 'coordinate-5', hash: '7281b33df73374d4a22bd7e6a73963172b334a9ac529d9386f32903516f3a3ab' },
  { label: 'coordinate-6', hash: '68c212656aef746ae58de4412fcaf4d24fbd8992856ef5d489b6af3f8e593e8f' },
  { label: 'coordinate-7', hash: 'cce7ba3317a1d6f7b16df02958e80113ebac91352d6efea27eade2f3e2f8ba76' },
  { label: 'coordinate-8', hash: 'd312e67b8fb38e02b434815297c065ddb2004b09d18a5bc21b3ec55003f9c1f5' },
];

const rulesByWordCount = new Map();
for (const rule of forbiddenWordRules) {
  const existing = rulesByWordCount.get(rule.words) ?? new Map();
  existing.set(rule.hash, rule.label);
  rulesByWordCount.set(rule.words, existing);
}

const numberRulesByHash = new Map(
  forbiddenNumberRules.map((rule) => [rule.hash, rule.label])
);

function hash(value) {
  return createHash('sha256').update(value).digest('hex');
}

function listFiles(directory, relativeDirectory = '') {
  const files = [];

  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if (entry.isDirectory() && ignoredDirectoryNames.has(entry.name)) {
      continue;
    }

    const absolutePath = path.join(directory, entry.name);
    const relativePath = path.join(relativeDirectory, entry.name);

    if (entry.isDirectory()) {
      if (entry.name === '.claude') {
        prohibitedDirectoryViolations.push(
          `${relativePath}: prohibited-hidden-assistant-directory`
        );
      }
      if (entry.name === 'originals') {
        prohibitedDirectoryViolations.push(
          `${relativePath}: prohibited-original-assets-directory`
        );
      }
      files.push(...listFiles(absolutePath, relativePath));
    } else if (entry.isFile() || entry.isSymbolicLink()) {
      files.push(relativePath);
    }
  }

  return files;
}

function wordTokens(value) {
  return value.toLowerCase().normalize('NFKC').match(/[a-z0-9]+/g) ?? [];
}

function findForbiddenWords(value) {
  const tokens = wordTokens(value);
  const matches = new Set();

  for (const [wordCount, rules] of rulesByWordCount) {
    for (let index = 0; index <= tokens.length - wordCount; index += 1) {
      const candidate = tokens.slice(index, index + wordCount).join(' ');
      const label = rules.get(hash(candidate));
      if (label) {
        matches.add(label);
      }
    }
  }

  return matches;
}

export function findForbiddenNumbers(value) {
  // A decimal SVG coordinate is not a ZIP code. Preserve exact five-digit
  // integers for ZIP matching while retaining normalized phone/coordinate checks.
  const integerZipCandidates = new Set(
    (value.match(/[+-]?\d+(?:[.,]\d+)?/g) ?? []).filter(token => /^\d{5}$/.test(token))
  );
  const candidates = new Set(
    (value.match(/[+-]?\d+(?:[.,]\d+)?/g) ?? []).map((match) =>
      match.replace(/\D/g, '')
    )
  );

  for (const phoneLike of value.matchAll(
    /(?:\+?1[\s().-]*)?\(?\d{3}\)?[\s.-]*\d{3}[\s.-]*\d{4}/g
  )) {
    const digits = phoneLike[0].replace(/\D/g, '');
    candidates.add(digits.length === 10 ? `1${digits}` : digits);
  }

  const matches = new Set();
  for (const candidate of candidates) {
    const label = numberRulesByHash.get(hash(candidate));
    if (label && (!label.startsWith('zip-') || integerZipCandidates.has(candidate))) {
      matches.add(label);
    }
  }

  return matches;
}

async function metadataViolations(relativePath, buffer) {
  if (!/\.(?:avif|jpe?g|png|webp)$/i.test(relativePath)) return [];
  // Inspect actual image metadata; short substrings can occur in compressed pixels.
  const metadata = await sharp(buffer).metadata();
  return ['exif', 'iptc', 'xmp'].filter(key => metadata[key]?.length).map(key => `embedded-${key}-metadata`);
}

function shouldScanDecodedContent(relativePath, buffer) {
  if (
    /\.(?:avif|gif|ico|jpe?g|png|webp|woff2?|ttf|otf)$/i.test(relativePath)
  ) {
    return false;
  }

  return !buffer.includes(0);
}

function structuralViolations(relativePath) {
  const parts = relativePath.split(path.sep);
  const basename = parts.at(-1) ?? '';
  const violations = [];

  if (parts.includes('.claude')) violations.push('prohibited-hidden-assistant-directory');
  if (parts.includes('originals')) violations.push('prohibited-original-assets-directory');
  if (basename.startsWith('.env')) violations.push('prohibited-environment-file');
  if (/^licen[cs]e(?:\.|$)/i.test(basename) && !['LICENSE', 'apps/practice-studio/LICENSE'].includes(relativePath.replaceAll(path.sep, '/'))) violations.push('unreviewed-license-file');

  return violations;
}

const GITHUB_WEB_COMMITTER = /^Commit:\s+GitHub <noreply@github\.com>\s*$/m;
const MERGE_PARENTS = /^Merge:\s+/m;
const GITHUB_PR_MERGE_MESSAGE = /^    Merge [0-9a-f]+ into [0-9a-f]+/m;

export function stripGitHubGeneratedMergeCommits(history) {
  return history
    .split(/(?=^commit [0-9a-f]{7,40}$)/m)
    .filter((block) => {
      if (!block.startsWith('commit ')) {
        return true;
      }

      const isGitHubCommitter = GITHUB_WEB_COMMITTER.test(block);
      const isPullRequestMerge =
        MERGE_PARENTS.test(block) || GITHUB_PR_MERGE_MESSAGE.test(block);

      return !(isGitHubCommitter && isPullRequestMerge);
    })
    .join('');
}

function isCliEntry() {
  const entry = process.argv[1];
  return Boolean(entry) && fileURLToPath(import.meta.url) === path.resolve(entry);
}

function scanValue(label, value, violations) {
  for (const match of findForbiddenWords(value)) {
    violations.push(`${label}: ${match}`);
  }
  for (const match of findForbiddenNumbers(value)) {
    violations.push(`${label}: ${match}`);
  }
}

async function main() {
  const violations = [];
  const files = listFiles(ROOT);
  violations.push(...prohibitedDirectoryViolations);

  for (const relativePath of files) {
    for (const violation of structuralViolations(relativePath)) {
      violations.push(`${relativePath}: ${violation}`);
    }

    scanValue(`${relativePath} (path)`, relativePath, violations);

    const absolutePath = path.join(ROOT, relativePath);
    if (lstatSync(absolutePath).isSymbolicLink()) {
      violations.push(`${relativePath}: symbolic-links-are-not-allowed`);
      continue;
    }

    const buffer = readFileSync(absolutePath);
    if (shouldScanDecodedContent(relativePath, buffer)) {
      scanValue(relativePath, buffer.toString('utf8'), violations);
    }

    for (const violation of await metadataViolations(relativePath, buffer)) {
      violations.push(`${relativePath}: ${violation}`);
    }
  }

  // Machine-local Git configuration is not a distributable artifact.
  // Tracked content and complete imported history are still scanned.

  if (args.has('--history')) {
    try {
      const history = stripGitHubGeneratedMergeCommits(
        execFileSync(
          'git',
          ['log', '--all', '--format=fuller', '--no-ext-diff', '--find-renames', '-p'],
          { cwd: ROOT, encoding: 'utf8', maxBuffer: 256 * 1024 * 1024 }
        )
      );
      scanValue('complete-git-history', history, violations);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      if (!message.includes('does not have any commits yet')) {
        violations.push(`complete-git-history: unable-to-scan (${message})`);
      }
    }
  }

  if (violations.length > 0) {
    console.error(`Privacy gate failed with ${violations.length} violation(s):`);
    for (const violation of [...new Set(violations)].sort()) {
      console.error(`- ${violation}`);
    }
    process.exit(1);
  }

  console.log(
    `Privacy gate passed: ${files.length} workspace files${args.has('--history') ? ' and complete Git history' : ''} scanned.`
  );
}

if (isCliEntry()) {
  main().catch(error => { console.error(error.message); process.exitCode = 1; });
}
