import backgroundSettings from "./backgroundSettings";
import generalSettings from "./generalSettings";
import noteSettings from "./noteSettings";

/**
 * Wrapper for chrome.storage
 * ================================
 * this storage is similar to local storage (localData, sibling folder).
 * the reason this storage exists is that to make it available in the service worker
 */
const appData = {
  backgroundSettings,
  generalSettings,
  noteSettings,
};

export default appData;

declare global {
	var appdata: typeof appData;
}

global.appdata = appData;