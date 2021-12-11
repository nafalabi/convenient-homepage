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
}

const localData = new LocalData();

export default localData;
