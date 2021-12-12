import { STORAGE_KEY } from "../../app/storage/app-data/backgroundSettings";
import alarms from "../alarms";

const backgroundSettings = {
  key: STORAGE_KEY,

  handleOnChange: async function (newValue: any) {
    // reset the alarm
    await chrome.alarms.clear(alarms.retrieveBackground.name);
    await alarms.retrieveBackground.registerAlarm(false);
  },
};

export default backgroundSettings;
