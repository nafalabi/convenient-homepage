import backgroundProviderDefaults from "./defaultValues/backgroundProvider.json";
import generalSettingsDefaults from "./defaultValues/generalSettings.json";

const setOrGet = (key, value, defaultValue) => {
  if (value !== undefined) {
    return localStorage.setItem(key, JSON.stringify(value));
  } else {
    return JSON.parse(localStorage.getItem(key)) || defaultValue || "";
  }
};

class LocalStorage {
  selectedTodoId = (value) => setOrGet("selectedTodoId", value);
  backgroundProvider = (value) =>
    setOrGet("backgroundProvider", value, backgroundProviderDefaults);
  generalSettings = (value) =>
    setOrGet("generalSettings", value, generalSettingsDefaults);
}

const localData = new LocalStorage();

export default localData;
