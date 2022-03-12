const CACHE_NAME = "background-image";

const backgroundImage = {
  cacheableHosts: ["images.unsplash.com", "pixabay.com", "bing.com"],
  async getOrSet(req: string | Request) {
    const cm = await caches.open(CACHE_NAME);

    return cm.match(req).then(function (response) {
      // cache is available, return the cache
      if (response !== undefined) return response;
      // cache is not available, fetch it first then cache the request
      return fetch(req).then(function (response) {
        // response may be used only once
        // we need to save clone to put one copy in cache
        // and serve second one
        let responseClone = response.clone();

        if (response.status === 200) cm.put(req, responseClone);

        return response;
      });
    });
  },
  async clearCache() {
    return await caches.delete(CACHE_NAME);
  },
};

export default backgroundImage;
