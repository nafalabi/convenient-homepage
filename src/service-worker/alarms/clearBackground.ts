import appData from "../../app/storage/app-data";
import dexieDB from "../../app/storage/dexie/db";

const ALARM_NAME = "clear-background";

const clearBackground = {
  name: ALARM_NAME,

  action: async function () {
    const now = Math.floor(Date.now() / 1000);
    const { background_lifetime, background_lifetime_unit } =
      await appData.backgroundSettings();

    let lifetime = 60 * 60 * 24 * 5; // default 5 days

    switch (background_lifetime_unit) {
      case "weeks":
        lifetime = background_lifetime * 60 * 60 * 24 * 7;
        break;
      case "days":
        lifetime = background_lifetime * 60 * 60 * 24;
        break;
      case "hours":
        lifetime = background_lifetime * 60 * 60;
        break;
      default:
        break;
    }

    const ids = await dexieDB.background
      .where("expireat")
      .below(now - lifetime)
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
      periodInMinutes: 5,
    });
  },
};

export default clearBackground;
