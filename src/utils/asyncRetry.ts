import { createLogger } from './logger';
const logger = createLogger('src/utils/asyncRetry');

export const asyncRetry = async <T>(fn: () => Promise<T>): Promise<T> => {
  try {
    return await fn();
  } catch (error) {
    logger.warn(`${fn.name} failed with ${error}. Re-trying...`);
    return asyncRetry(fn);
  }
};
