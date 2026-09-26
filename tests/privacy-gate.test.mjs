import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import test from 'node:test';
import { stripGitHubGeneratedMergeCommits } from '../scripts/privacy-gate.mjs';

test('the complete workspace passes the hashed privacy denylist', () => {
  const result = spawnSync(
    process.execPath,
    ['scripts/privacy-gate.mjs'],
    {
      cwd: process.cwd(),
      encoding: 'utf8',
      maxBuffer: 64 * 1024 * 1024,
    }
  );

  assert.equal(
    result.status,
    0,
    [result.stdout, result.stderr].filter(Boolean).join('\n')
  );
});

const githubMergeCommit = `commit 736dc4485157d1a915144972929d677ca607b34c
Merge: 2e9bca9 be3fd75
Author:     Example User <example-user@example.com>
AuthorDate: Mon Aug 31 07:30:24 2026 -0700
Commit:     GitHub <noreply@github.com>
CommitDate: Mon Aug 31 07:30:24 2026 -0700

    Merge be3fd75 into 2e9bca9
`;

const repositoryCommit = `commit be3fd75e6b9d78e573690ac1fc03292a37663833
Author:     Hearthmere Showcase <245281751+jonathan-arteaga@users.noreply.github.com>
AuthorDate: Mon Aug 31 14:30:01 2026 +0000
Commit:     Hearthmere Showcase <245281751+jonathan-arteaga@users.noreply.github.com>
CommitDate: Mon Aug 31 14:30:01 2026 +0000

    Pin nanoid to 3.3.18 to clear the high audit finding
`;

const githubSquashCommit = `commit 0123456789abcdef0123456789abcdef01234567
Author:     Example User <example-user@example.com>
AuthorDate: Mon Aug 31 07:30:24 2026 -0700
Commit:     GitHub <noreply@github.com>
CommitDate: Mon Aug 31 07:30:24 2026 -0700

    Pin nanoid to 3.3.18 to clear the high audit finding
`;

const shallowGithubMergeCommit = `commit 95ef4e663a0f723796c12bfc4cdaa961cf20dd75
Author:     Example User <example-user@example.com>
AuthorDate: Mon Aug 31 14:41:00 2026 +0000
Commit:     GitHub <noreply@github.com>
CommitDate: Mon Aug 31 14:41:00 2026 +0000

    Merge 22a763b85c28b4673515bfa90cf6df4122f2b343 into 2e9bca9a96fe9b9eb8e522e9ea7eaa9723ccbf33
`;

test('history scan drops GitHub-generated merge commits only', () => {
  const scanned = stripGitHubGeneratedMergeCommits(
    `${githubMergeCommit}${repositoryCommit}${githubSquashCommit}`
  );

  assert.equal(scanned.includes('Merge be3fd75 into 2e9bca9'), false);
  assert.equal(scanned.includes(repositoryCommit), true);
  assert.equal(scanned.includes(githubSquashCommit), true);
});

test('history scan drops shallow GitHub merge commits that omit Merge parents', () => {
  const scanned = stripGitHubGeneratedMergeCommits(
    `${shallowGithubMergeCommit}${repositoryCommit}`
  );

  assert.equal(scanned.includes('example-user@example.com'), false);
  assert.equal(scanned.includes(repositoryCommit), true);
});


test('decimal icon coordinates are not ZIP codes, but exact ZIP values remain detected', async () => {
  const { findForbiddenNumbers } = await import('../scripts/privacy-gate.mjs');
  const decimal = '67,216';
  assert.equal(findForbiddenNumbers(`M176,181.64,${decimal},216`).has('zip-property-3'), false);
  assert.equal(findForbiddenNumbers(decimal.replace(',', '')).has('zip-property-3'), true);
});
