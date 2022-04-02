import backgroundImageCacheStore from "./store/backgroundImage";
import faviconCacheStore from "./store/favicon";

const cacheStorage = {
  backgroundImage: backgroundImageCacheStore,
  favicon: faviconCacheStore,
};

export default cacheStorage;
