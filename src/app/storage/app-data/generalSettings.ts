import setOrGet from "./abstract";

export interface IGeneralSettings {
  name: string;
  darkMode: boolean;
  showClock: boolean;
  showTimeGreeting: boolean;
  showCasualGreeting: boolean;
  showSearchField: boolean;
}

export const generalSettingsDefault: IGeneralSettings = {
  name: "",
  darkMode: false,
  showClock: true,
  showTimeGreeting: true,
  showCasualGreeting: true,
  showSearchField: true,
};

const STORAGE_KEY = "generalSettings";

/**
 * General settings
 * ----
 * Set or get general settings\
 * if val is defined it will be set function\
 * if val is not defined it will be get function
 */
const generalSettings = (val?: IGeneralSettings) => {
  return setOrGet(STORAGE_KEY, generalSettingsDefault, val);
};

export default generalSettings;
