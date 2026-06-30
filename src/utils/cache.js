// Système de cache simple
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const setCache = (key, data, duration = CACHE_DURATION) => {
  cache.set(key, {
    data,
    timestamp: Date.now(),
    duration
  });
};

export const getCache = (key) => {
  const item = cache.get(key);
  if (!item) return null;
  
  const age = Date.now() - item.timestamp;
  if (age > item.duration) {
    cache.delete(key);
    return null;
  }
  
  return item.data;
};

export const clearCache = (key) => {
  if (key) {
    cache.delete(key);
  } else {
    cache.clear();
  }
};

export const invalidateCache = (pattern) => {
  for (const key of cache.keys()) {
    if (key.includes(pattern)) {
      cache.delete(key);
    }
  }
};
