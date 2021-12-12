import ImageAPI from "../../app/api/image-api";
import appData from "../../app/storage/app-data";

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

    chrome.alarms.create(ALARM_NAME, {
      periodInMinutes: backgroundSettings.refresh_interval / 60,
    });
  },
};

export default retrieveBackground;
