declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: 'production' | 'development' | 'test';
    PORT: string;
    MONGO_URI: string;
    JWT_SECRET: string;
  }
}
