export const asyncRetry = async <T>(fn: () => Promise<T>): Promise<T> => {
  try {
    return await fn();
  } catch (error) {
    console.warn(`${fn.name} failed with ${error}. Re-trying...`);
    return asyncRetry(fn);
  }
};
