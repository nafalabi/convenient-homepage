import dexieDB from "../../app/storage/dexie/db";

const ALARM_NAME = "clear-background";

const clearBackground = {
  name: ALARM_NAME,

  action: async function () {
    const now = Math.floor(Date.now() / 1000);
    const threshold = 60 * 60 * 24 * 30; // 30 days

    const ids = await dexieDB.background
      .where("expireat")
      .below(now - threshold)
      .primaryKeys();
    await dexieDB.background.bulkDelete(ids);

    console.info(
      `Background images cleared, ids: ${JSON.stringify(ids)}`,
      new Date().toLocaleString()
    );
  },

  registerAlarm: async function () {
    // if already registered, skip
    if (await chrome.alarms.get(ALARM_NAME)) return;

    chrome.alarms.create(ALARM_NAME, {
      // Todo: make it dynamic from the settings
      periodInMinutes: 30,
    });
  },
};

export default clearBackground;
