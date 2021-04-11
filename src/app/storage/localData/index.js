import backgroundProviderDefaults from "./defaultValues/backgroundProvider.json";

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
}

const localData = new LocalStorage();

export default localData;
