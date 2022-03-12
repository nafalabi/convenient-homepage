export abstract class CacheStore {
  static cacheableHosts: string[];
  static getOrSet: (req: string | Request) => Promise<Response>;
  static clearCache: () => Promise<boolean>;
}
