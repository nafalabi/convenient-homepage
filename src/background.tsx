import appData from "./app/storage/app-data";
import clearBackground from "./service-worker/clearBackground";
import retrieveBackground from "./service-worker/retrieveBackground";

enum AvailableAlarms {
  CLEAR_BACKGROUND = "clear-background",
  RETRIEVE_NEW_BACKGROUND = "retrieve-background",
}

chrome.alarms.onAlarm.addListener((alarm) => {
  switch (alarm.name) {
    case AvailableAlarms.CLEAR_BACKGROUND:
      clearBackground();
      break;
    case AvailableAlarms.RETRIEVE_NEW_BACKGROUND:
      retrieveBackground();
      break;
    default:
      break;
  }
});

chrome.runtime.onInstalled.addListener(async () => {
  const backgroundSettings = await appData.backgroundSettings();

  // Get initial background image
  retrieveBackground();

  await chrome.alarms.clearAll();

  // Define periodic task to clear old background images
  chrome.alarms.create(AvailableAlarms.CLEAR_BACKGROUND, {
    // Todo: make it dynamic from the settings
    periodInMinutes: 30,
  });

  // Define periodic task to retrieve new background image
  chrome.alarms.create(AvailableAlarms.RETRIEVE_NEW_BACKGROUND, {
    periodInMinutes: backgroundSettings.refresh_interval,
  });

  console.log("installed");
});

// merely to satisfy the linter
export {};
