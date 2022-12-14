import dotenv from 'dotenv';

dotenv.config();

const CONFIG = {
    API_PORT: process.env.API_PORT ?? 8000,
    DB_PORT: process.env.DB_PORT ?? 3306,
    DB_HOST: process.env.DB_HOST ?? 'localhost',
    DB_DATABASE: process.env.DB_DATABASE ?? 'database',
    DB_USERNAME: process.env.DB_USERNAME ?? 'root',
    DB_PASSWORD: process.env.DB_PASSWORD ?? '1234',
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID ?? '',
    GOOGLE_SECRET_KEY: process.env.GOOGLE_SECRET_KEY ?? '',
    GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL ?? '',
    GLOBAL_PREFIX: process.env.GLOBAL_PREFIX ?? 'v1/api',
    COOKIE_SECRET: process.env.COOKIE_SECRET ?? '',
};

export default CONFIG;
