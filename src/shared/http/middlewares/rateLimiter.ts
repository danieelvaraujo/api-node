import { Request, Response, NextFunction } from 'express';
import { RateLimiterRedis } from 'rate-limiter-flexible';
const redis = require('redis');

import AppError from '@shared/errors/AppError';

const redisClient = redis.createClient({
  host: process.env.REDIST_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASS || undefined,
});

const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'ratelimit',
  points: 5,
  duration: 1,
});

async function rateLimiter(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  try {
    await limiter.consume(request.ip);

    return next();
  } catch (err) {
    throw new AppError('Too many requests!', 429);
  }
}

export default rateLimiter;
