/// <reference path="./process-env.d.ts" />

export const REQUIRED_PRODUCTION_ENV_KEYS = ['NEXT_PUBLIC_SITE_URL'] as const;

export type RequiredProductionEnvKey = (typeof REQUIRED_PRODUCTION_ENV_KEYS)[number];

interface ValidateProductionEnvOptions {
  requiredKeys?: readonly string[];
  context?: string;
  env?: NodeJS.ProcessEnv;
}

export interface ProductionEnvValidationResult {
  ok: boolean;
  missingKeys: string[];
  invalidKeys?: string[];
  message?: string;
}

function isMissing(value: string | undefined): boolean {
  return !value || value.trim().length === 0;
}

function shouldSkipBuildTimeValidation(env: NodeJS.ProcessEnv): boolean {
  return env.NEXT_PHASE === 'phase-production-build' || env.NEXT_PRIVATE_BUILD_WORKER === '1';
}

// FNV-1a hashes avoid retaining source-client hostnames in this portfolio.
const BLOCKED_HOSTNAME_HASHES = new Set([
  3286143326,
  602130943,
  3220939008,
  1879954908,
  1492841150,
  2452107499,
]);

function hashHostname(value: string): number {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function isBlockedSourceHostname(hostname: string): boolean {
  const labels = hostname.toLowerCase().replace(/\.$/, '').split('.');
  return labels.some((_, index) =>
    BLOCKED_HOSTNAME_HASHES.has(hashHostname(labels.slice(index).join('.')))
  );
}

function getSiteUrlIssue(value: string): string | undefined {
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:') {
      return 'NEXT_PUBLIC_SITE_URL must use HTTPS';
    }
    if (isBlockedSourceHostname(url.hostname)) {
      return 'NEXT_PUBLIC_SITE_URL must not use a source-client hostname';
    }
  } catch {
    return 'NEXT_PUBLIC_SITE_URL must be a valid absolute URL';
  }

  return undefined;
}

export function validateProductionEnv(
  options?: ValidateProductionEnvOptions
): ProductionEnvValidationResult {
  const env = options?.env ?? process.env;

  if (env.NODE_ENV !== 'production' || shouldSkipBuildTimeValidation(env)) {
    return { ok: true, missingKeys: [] };
  }

  const requiredKeys = options?.requiredKeys ?? REQUIRED_PRODUCTION_ENV_KEYS;
  const missingKeys = requiredKeys.filter((key) => isMissing(env[key]));

  if (missingKeys.length === 0) {
    const siteUrlIssue = getSiteUrlIssue(env.NEXT_PUBLIC_SITE_URL!);
    if (!siteUrlIssue) {
      return { ok: true, missingKeys: [] };
    }

    const contextSuffix = options?.context ? ` (${options.context})` : '';
    return {
      ok: false,
      missingKeys: [],
      invalidKeys: ['NEXT_PUBLIC_SITE_URL'],
      message: `${siteUrlIssue}${contextSuffix}`,
    };
  }

  const contextSuffix = options?.context ? ` (${options.context})` : '';

  return {
    ok: false,
    missingKeys,
    message: `Missing required production environment variables${contextSuffix}: ${missingKeys.join(', ')}`,
  };
}

export function assertProductionEnv(options?: ValidateProductionEnvOptions): void {
  const validation = validateProductionEnv(options);
  if (!validation.ok) {
    throw new Error(validation.message);
  }
}
