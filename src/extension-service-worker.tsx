import alarms from "./service-worker/alarms";
import storage from "./service-worker/storage";
import cacheStorage from "app/cache";
import exposeGlobalVars from "exposeGlobalVars";

declare const self: ServiceWorkerGlobalScope;

// Alarm listener
chrome.alarms.onAlarm.addListener((alarm) => {
  switch (alarm.name) {
    case alarms.refreshImageList.name:
      alarms.refreshImageList.action();
      break;
    case alarms.cycleBackground.name:
      alarms.cycleBackground.action();
      break;
    default:
      break;
  }
});

// Storage changes listener
chrome.storage.onChanged.addListener((changes, areaName) => {
  const keys = Object.keys(changes);

  for (const key of keys) {
    const { newValue, oldValue } = changes[key];

    switch (key) {
      case storage.backgroundSettings.key:
        storage.backgroundSettings.handleOnChange(newValue, oldValue);
        break;
      default:
        break;
    }
  }
});

// Initialization
chrome.runtime.onInstalled.addListener(async () => {
  await alarms.refreshImageList.registerAlarm();
  await alarms.cycleBackground.registerAlarm();

  console.log("installed");
});

// Fetch Request Interceptor (For Processing Cache)
self.addEventListener("fetch", function (e) {
  const url = new URL(e.request.url);

  if (cacheStorage.backgroundImage.cacheableHosts.includes(url.hostname)) {
    e.respondWith(cacheStorage.backgroundImage.getOrSet(e.request.url));
  }

  if (cacheStorage.favicon.cacheableHosts.includes(url.hostname)) {
    if (cacheStorage.favicon.cacheableUrlPaths.includes(url.pathname))
      e.respondWith(cacheStorage.favicon.getOrSet(e.request.url));
  }
});

// merely to satisfy the linter
export {};

exposeGlobalVars();
