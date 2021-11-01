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

class LocalData {
  _setOrGet<T = any>(
    key: string,
    value?: T,
    defaultValue?: T
  ): T | null | void {
    if (value !== undefined) {
      return localStorage.setItem(key, JSON.stringify(value));
    } else {
      return (
        JSON.parse(localStorage.getItem(key) ?? "null") ?? defaultValue ?? null
      );
    }
  }

  backgroundProvider(value?: IBackgroundProvider) {
    return this._setOrGet<IBackgroundProvider>(
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
