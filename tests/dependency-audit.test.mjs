import assert from "node:assert/strict";
import test from "node:test";
import { reviewAudit } from "../scripts/audit-dependencies.mjs";

const braces = { module_name: "braces", github_advisory_id: "GHSA-vfj7-8cjw-p6xm", severity: "high", findings: [{ dev: true, version: "3.0.3" }] };
const report = (advisories) => ({ advisories, metadata: { vulnerabilities: { high: Object.keys(advisories).length } } });

test("clean full audit passes without exceptions", () => {
  assert.deepEqual(reviewAudit(report({})), { exceptions: [], unexpected: [] });
});
test("only the specific development-only upstream exception is recognized", () => {
  assert.equal(reviewAudit(report({ braces })).exceptions.length, 1);
});
test("a production finding cannot use the development exception", () => {
  assert.equal(reviewAudit(report({ braces: { ...braces, findings: [{ dev: false, version: "3.0.3" }] } })).unexpected.length, 1);
});
test("a different advisory, package, version, or severity still needs review", () => {
  for (const change of [{ github_advisory_id: "GHSA-new" }, { module_name: "other" }, { severity: "critical" }, { findings: [{ dev: true, version: "3.0.2" }] }]) {
    assert.equal(reviewAudit(report({ finding: { ...braces, ...change } })).unexpected.length, 1);
  }
});
test("mixed production and development paths cannot be excepted", () => {
  assert.equal(reviewAudit(report({ braces: { ...braces, findings: [...braces.findings, { dev: false, version: "3.0.3" }] } })).unexpected.length, 1);
});
test("missing scope and empty findings cannot be excepted", () => {
  for (const findings of [[], [{ version: "3.0.3" }]]) assert.equal(reviewAudit(report({ braces: { ...braces, findings } })).unexpected.length, 1);
});
test("invalid audit data and counts fail closed", () => {
  for (const data of [null, {}, { advisories: [] }, { advisories: {}, metadata: { vulnerabilities: { high: 1 } } }, { advisories: {}, metadata: { vulnerabilities: { high: -1 } } }, { advisories: {}, metadata: { vulnerabilities: { high: "0" } } }]) assert.throws(() => reviewAudit(data));
});
