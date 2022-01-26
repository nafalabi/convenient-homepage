import setOrGet from "./abstract";

export interface ShortcutKey {
  ctrl: boolean;
  shift: boolean;
  alt: boolean;
  key: string;
}

export enum ShortcutNames {
  OPEN_DRAWER = "opendrawer",
  OPEN_NOTES = "opennotes",
  OPEN_BOOKMARKS = "openbookmarks",
  OPEN_SETTINGS = "opensettings",
}

export interface IShortcuts {
  [key: string]: ShortcutKey;
}

export const shortcutDefault: IShortcuts = {
  [ShortcutNames.OPEN_DRAWER]: {
    ctrl: true,
    shift: false,
    alt: false,
    key: "m",
  },
  [ShortcutNames.OPEN_NOTES]: {
    ctrl: false,
    shift: false,
    alt: true,
    key: "n",
  },
  [ShortcutNames.OPEN_BOOKMARKS]: {
    ctrl: false,
    shift: false,
    alt: true,
    key: "b",
  },
  [ShortcutNames.OPEN_SETTINGS]: {
    ctrl: false,
    shift: false,
    alt: true,
    key: "s",
  },
};

const STORAGE_KEY = "shortcuts";

const shortcuts = (val: IShortcuts) => {
  return setOrGet(STORAGE_KEY, shortcutDefault, val);
};

export default shortcuts;
