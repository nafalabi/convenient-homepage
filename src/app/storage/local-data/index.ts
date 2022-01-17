/**
 * Wrapper for localStorage
 */
class LocalData {
  static _setOrGet<T = any>(key: string, value?: T, defaultValue?: T): T {
    if (value !== undefined) {
      localStorage.setItem(key, JSON.stringify(value));
      return value;
    } else {
      return JSON.parse(localStorage.getItem(key) ?? "null") ?? defaultValue;
    }
  }

  static alreadyFirstSetup(value?: boolean) {
    return this._setOrGet("alreadySetup", value, false);
  }
}

export default LocalData;

declare global {
  var localdata: typeof LocalData;
}

global.localdata = LocalData;
