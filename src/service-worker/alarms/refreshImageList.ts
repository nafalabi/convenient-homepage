import DexieAPI from "app/api/dexie-api";

const ALARM_NAME = "refresh-background-list";

const refreshImageList = {
  name: ALARM_NAME,
  action: async function () {
    await DexieAPI.backgroundimage.refreshBackgroundList();

    console.info(
      `Background image list has been refreshed`,
      new Date().toLocaleString()
    );
  },
  registerAlarm: async function (doInitial: boolean = true) {
    // if already registered, skip
    if (await chrome.alarms.get(ALARM_NAME)) return;

    // Get initial background image
    if (doInitial) this.action();

    chrome.alarms.create(ALARM_NAME, {
      // Todo: make it dynamic from the settings
      periodInMinutes: 60 * 24 * 5, // default 5 days
    });
  },
};

export default refreshImageList;
