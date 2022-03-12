import AppController from "app/controller";
import appData from "app/storage/app-data";
import convToMin from "app/utils/convToMin";

const ALARM_NAME = "cycle-background";

const cycleBackground = {
  name: ALARM_NAME,
  action: async () => {
    await AppController.backgroundimage.cycleBackground();

    console.info(`Background has been rotated`, new Date().toLocaleString());
  },
  registerAlarm: async () => {
    // if already registered, skip
    if (await chrome.alarms.get(ALARM_NAME)) return;

    const { cycle_interval, cycle_interval_unit } =
      await appData.backgroundSettings();

    const periodInMinutes = convToMin(cycle_interval_unit, cycle_interval);

    chrome.alarms.create(ALARM_NAME, { periodInMinutes });

    console.log("registered cycle background");
  },
};

export default cycleBackground;
