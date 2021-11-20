export const STORAGE_KEY_GENERAL_SETTINGS = "generalSettings";

export const generalSettingsDefaults: IGeneralSettings = {
  name: "",
};

export interface IGeneralSettings {
  name: string;
}
