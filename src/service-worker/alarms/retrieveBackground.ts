import ImageAPI from "app/api/image-api";
import appData from "app/storage/app-data";

const ALARM_NAME = "retrieve-background";

const retrieveBackground = {
  name: ALARM_NAME,

  action: async function () {
    const backgroundSettings = await appData.backgroundSettings();
    const imageApi = new ImageAPI(backgroundSettings);

    const newBackground = await imageApi.getNewBackground();
    imageApi.storeAndSaveAsActive(newBackground.imageBase64);

    console.info("Background retrieved", new Date().toLocaleString());
  },

  registerAlarm: async function (retrieveImage: boolean = true) {
    // if already registered, skip
    if (await chrome.alarms.get(ALARM_NAME)) return;

    // Get initial background image
    if (retrieveImage) this.action();

    const backgroundSettings = await appData.backgroundSettings();

    let period = 1440; // Default 1 day

    switch (backgroundSettings.refresh_interval_unit) {
      case "days":
        period = backgroundSettings.refresh_interval * 24 * 60;
        break;
      case "hours":
        period = backgroundSettings.refresh_interval * 60;
        break;
      case "minutes":
        period = backgroundSettings.refresh_interval;
        break;
      default:
        break;
    }

    chrome.alarms.create(ALARM_NAME, {
      periodInMinutes: period,
    });
  },
};

export default retrieveBackground;
