import {
  backgroundSettingsDefault,
  IBackgroundSettings,
  STORAGE_KEY,
} from "app/storage/app-data/backgroundSettings";
import alarms from "service-worker/alarms";

const backgroundSettings = {
  key: STORAGE_KEY,

  handleOnChange: async function (
    newValue: IBackgroundSettings = backgroundSettingsDefault,
    oldValue: IBackgroundSettings = backgroundSettingsDefault
  ) {
    // Reset cycle background alarm
    if (
      newValue.cycle_interval !== oldValue.cycle_interval ||
      newValue.cycle_interval_unit !== oldValue.cycle_interval_unit
    ) {
      await chrome.alarms.clear(alarms.cycleBackground.name);
      await alarms.cycleBackground.registerAlarm();
    }

    // Reset refresh background list alarm
    if (
      newValue.refresh_list_interval !== oldValue.refresh_list_interval ||
      newValue.refresh_list_interval_unit !==
        oldValue.refresh_list_interval_unit
    ) {
      await chrome.alarms.clear(alarms.refreshImageList.name);
      await alarms.refreshImageList.registerAlarm(false);
    }
  },
};

export default backgroundSettings;
