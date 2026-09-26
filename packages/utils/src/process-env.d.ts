declare namespace NodeJS {
  interface ProcessEnv {
    [key: string]: string | undefined;
    NODE_ENV?: string;
    NEXT_PUBLIC_SITE_URL?: string;
    NEXT_PHASE?: string;
    NEXT_PRIVATE_BUILD_WORKER?: string;
  }

  interface Process {
    env: ProcessEnv;
  }
}

declare var process: NodeJS.Process;
