import { RedisOptions } from 'ioredis';

interface ICacheConfig {
  config: {
    redis: RedisOptions;
  };
  driver: string;
}

export const cacheConfig: ICacheConfig = {
  config: {
    redis: {
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
      password: process.env.REDIS_PASSWORD || undefined,
    },
  },
  driver: 'redis',
};
