import AppController from "app/controller";
import appData from "app/storage/app-data";
import convToMin from "app/utils/convToMin";

const ALARM_NAME = "refresh-background-list";

const refreshImageList = {
  name: ALARM_NAME,
  action: async function () {
    await AppController.backgroundimage.refreshBackgroundList();

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

    const { refresh_list_interval, refresh_list_interval_unit } =
      await appData.backgroundSettings();

    const periodInMinutes = convToMin(
      refresh_list_interval_unit,
      refresh_list_interval
    );

    chrome.alarms.create(ALARM_NAME, {
      periodInMinutes,
    });

    console.log("registered refresh list")
  },
};

export default refreshImageList;
