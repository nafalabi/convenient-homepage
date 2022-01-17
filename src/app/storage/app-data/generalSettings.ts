import setOrGet from "./abstract";

export interface IGeneralSettings {
  name: string;
}

export const generalSettingsDefault: IGeneralSettings = {
  name: "",
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
