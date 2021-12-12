import alarms from "./service-worker/alarms";
import storage from "./service-worker/storage";

// Alarm listener
chrome.alarms.onAlarm.addListener((alarm) => {
  switch (alarm.name) {
    case alarms.clearBackground.name:
      alarms.clearBackground.action();
      break;
    case alarms.retrieveBackground.name:
      alarms.retrieveBackground.action();
      break;
    default:
      break;
  }
});

// Storage changes listener
chrome.storage.onChanged.addListener((changes, areaName) => {
  const keys = Object.keys(changes);

  for (const key of keys) {
    const { newValue } = changes[key];

    switch (key) {
      case storage.backgroundSettings.key:
        storage.backgroundSettings.handleOnChange(newValue);
        break;
      default:
        break;
    }
  }
});

// Initialization
chrome.runtime.onInstalled.addListener(async () => {
  // Define periodic task to clear old background images
  await alarms.clearBackground.registerAlarm();

  // Define periodic task to retrieve new background image
  await alarms.retrieveBackground.registerAlarm();

  console.log("installed");
});

// merely to satisfy the linter
export {};
