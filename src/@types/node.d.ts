declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: 'production' | 'development' | 'testing';
    PORT: string;
    MONGO_URI: string;
  }
}
