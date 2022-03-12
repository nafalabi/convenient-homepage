import backgroundSettings from "./backgroundSettings";
import generalSettings from "./generalSettings";
import noteSettings from "./noteSettings";
import shortcuts from "./shortcuts";

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
  shortcuts,
};

export default appData;
