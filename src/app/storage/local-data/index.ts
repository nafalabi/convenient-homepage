import {
  backgroundProviderDefaults,
  STORAGE_KEY_BACKGROUND_PROVIDER,
  IBackgroundProvider,
} from "./default-values/background-provider";
import {
  generalSettingsDefaults,
  IGeneralSettings,
  STORAGE_KEY_GENERAL_SETTINGS,
} from "./default-values/general-settings";
const STORAGE_KEY_ALREADY_SETUP = "alreadySetup";

class LocalData {
  _setOrGet<T = any>(key: string, value?: T, defaultValue?: T): T {
    if (value !== undefined) {
      localStorage.setItem(key, JSON.stringify(value));
      return value;
    } else {
      return JSON.parse(localStorage.getItem(key) ?? "null") ?? defaultValue;
    }
  }

  alreadyFirstSetup(value?: boolean) {
    return this._setOrGet(STORAGE_KEY_ALREADY_SETUP, value, false);
  }

  backgroundProvider(value?: IBackgroundProvider) {
    return this._setOrGet(
      STORAGE_KEY_BACKGROUND_PROVIDER,
      value,
      backgroundProviderDefaults
    );
  }

  generalSettings(value?: IGeneralSettings) {
    return this._setOrGet(
      STORAGE_KEY_GENERAL_SETTINGS,
      value,
      generalSettingsDefaults
    );
  }
}

const localData = new LocalData();

export default localData;
