import { registerAs } from '@nestjs/config';

export enum ConfigKey {
  App = 'App',
  Db = 'Db',
}

const AppConfig = registerAs(ConfigKey.App, () => ({
  port: Number(process.env.APP_PORT),
  appName: process.env.APP_NAME,
  baseUrl: process.env.BASE_URL,
  shortUrlLength: process.env.SHORT_URL_LENGTH
    ? parseInt(process.env.SHORT_URL_LENGTH)
    : 7,
}));

const DbConfig = registerAs(ConfigKey.Db, () => ({
  type: 'postgress',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT!),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  sync: process.env.DB_SYNC == 'true',
  entities: ['**/*.entity.ts'],
}));

export const configurations = [AppConfig, DbConfig];
