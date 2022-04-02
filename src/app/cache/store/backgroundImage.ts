import createCacheStore from "../createCacheStore";

const backgroundImageCacheStore = createCacheStore({
  cacheableHosts: ["images.unsplash.com", "pixabay.com", "bing.com"],
  cacheName: "background-image",
});

export default backgroundImageCacheStore;
