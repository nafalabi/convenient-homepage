import DexieAPI from "app/api/dexie-api";

const ALARM_NAME = "cycle-background-list";

const cycleBackground = {
  name: ALARM_NAME,
  action: async () => {
    await DexieAPI.backgroundimage.cycleBackground();

    console.info(`Background has been rotated`, new Date().toLocaleString());
  },
  registerAlarm: async () => {
    // if already registered, skip
    if (await chrome.alarms.get(ALARM_NAME)) return;

    chrome.alarms.create(ALARM_NAME, {
      // Todo: make it dynamic from the settings
      periodInMinutes: 60 * 3, // default 3 hour
    });
  },
};

export default cycleBackground;
