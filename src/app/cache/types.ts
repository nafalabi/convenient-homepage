export interface CacheStoreConfig {
  cacheName: string;
  cacheableHosts?: string[];
  cacheableUrlPaths?: string[];
}

export interface CacheStore {
  cacheName: string;
  cacheableHosts: string[];
  cacheableUrlPaths: string[];
  set: (req: string | Request, res: Response) => Promise<Response>;
  get: (req: string | Request) => Promise<Response | undefined>;
  getOrSet: (req: string | Request) => Promise<Response>;
  clearCache: () => Promise<boolean>;
}
