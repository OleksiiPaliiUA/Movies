declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: string;
      PORT: string;
      DB_NAME: string;
      DB_USER: string;
      DB_PASSWORD: string;
      DB_HOST: string;
      DB_PORT: string;
      ACCESS_TOKEN_SECRET: string;
      REFRESH_TOKEN_SECRET: string;
    }
  }
}

export {};
