declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: string | undefined;
    PORT: string | undefined;
  }
}
