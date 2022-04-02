import { CacheStore, CacheStoreConfig } from "./types";

const createCacheStore = ({
  cacheableUrlPaths = [],
  cacheableHosts = [],
  cacheName,
}: CacheStoreConfig): CacheStore => {
  const set = async (req: string | Request, res: Response) => {
    const cm = await caches.open(cacheName);
    await cm.put(req, res);
    return res;
  };

  const get = async (req: string | Request) => {
    const cm = await caches.open(cacheName);
    return await cm.match(req);
  };

  const getOrSet = async (req: string | Request) => {
    const cachedResponse = await get(req);
    if (cachedResponse !== undefined) return cachedResponse;

    const response = await fetch(req);

    // response may be used only once
    // we need to save clone to put one copy in cache
    // and serve second one
    let responseClone = response.clone();

    if (response.status === 200) set(req, responseClone);

    return response;
  };

  const clearCache = async () => await caches.delete(cacheName);

  return {
    cacheName,
    cacheableUrlPaths,
    cacheableHosts,
    set,
    get,
    getOrSet,
    clearCache,
  };
};

export default createCacheStore;
