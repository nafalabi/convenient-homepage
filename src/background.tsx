import clearBackground from "./service-worker/clearBackground";

enum AvailableAlarms {
  CLEAR_BACKGROUND = "clear-background",
}

chrome.alarms.onAlarm.addListener((alarm) => {
  switch (alarm.name) {
    case AvailableAlarms.CLEAR_BACKGROUND:
      clearBackground();
      break;
    default:
      break;
  }
});

chrome.runtime.onInstalled.addListener(async () => {
  await chrome.alarms.clearAll();
  // Define periodic task to clear old background images
  chrome.alarms.create(AvailableAlarms.CLEAR_BACKGROUND, {
    periodInMinutes: 30,
  });
  console.log("installed");
});

export {};
