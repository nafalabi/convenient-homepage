async function setOrGet<T = any>(
  key: string,
  defaultValue: T,
  value?: T
): Promise<T> {
  return new Promise((resolve) => {
    if (value === undefined) {
      chrome.storage.sync.get(key, (valObj) => {
        const val = valObj[key];
        resolve(val ?? defaultValue);
      });
    } else {
      chrome.storage.sync.set({ [key]: value }, () => {
        resolve(value);
      });
    }
  });
}

export default setOrGet;
