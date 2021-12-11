import backgroundSettings from "./backgroundSettings";
import generalSettings from "./generalSettings";

/**
 * this storage is similar to local storage (localData, sibling folder).
 * the reason this storage exists is that to make it available in the service worker
 */
const appData = {
	backgroundSettings: backgroundSettings,
	generalSettings: generalSettings,
}

export default appData;