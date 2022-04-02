import createCacheStore from "../createCacheStore";

const faviconCacheStore = createCacheStore({
  cacheName: "favicon-image",
  cacheableHosts: ["www.google.com"],
  cacheableUrlPaths: ["/s2/favicons"],
});

export default faviconCacheStore;
