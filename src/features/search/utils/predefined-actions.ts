import { IconType } from "app/constant";
import { SearchItem, SearchItemType } from "../types";

export enum PredefinedActionsIds {
  OPEN_NOTES = 0,
  OPEN_BOOKMARKS = 1,
  OPEN_SETTINGS = 2,
  SEARCH_ON_INTERNET = 3,
  OPEN_CHROME_APPS = 4,
  OPEN_ORIGINAL_HOMEPAGE = 5,
}

const predefinedActions: SearchItem[] = [
  {
    id: PredefinedActionsIds.SEARCH_ON_INTERNET,
    title: "Search on the Internet",
    subtitle: "Search with the default search engine",
    type: SearchItemType.PREDEFINED_ACTIONS,
    icon: "Search",
    iconType: IconType.MATERIAL_ICON,
  },
  {
    id: PredefinedActionsIds.OPEN_NOTES,
    title: "Open Notes",
    subtitle: "Open notes in convenient homepage",
    type: SearchItemType.PREDEFINED_ACTIONS,
    icon: "LibraryBooks",
    iconType: IconType.MATERIAL_ICON,
  },
  {
    id: PredefinedActionsIds.OPEN_BOOKMARKS,
    title: "Open Bookmarks",
    subtitle: "Open bookmarks in convenient homepage",
    type: SearchItemType.PREDEFINED_ACTIONS,
    icon: "CollectionsBookmark",
    iconType: IconType.MATERIAL_ICON,
  },
  {
    id: PredefinedActionsIds.OPEN_SETTINGS,
    title: "Open Settings",
    subtitle: "Open settings in convenient homepage",
    type: SearchItemType.PREDEFINED_ACTIONS,
    icon: "Settings",
    iconType: IconType.MATERIAL_ICON,
  },
  {
    id: PredefinedActionsIds.OPEN_CHROME_APPS,
    title: "Open Chrome Apps",
    subtitle: "Open chrome apps page",
    type: SearchItemType.PREDEFINED_ACTIONS,
    icon: "Apps",
    iconType: IconType.MATERIAL_ICON,
  },
  {
    id: PredefinedActionsIds.OPEN_ORIGINAL_HOMEPAGE,
    title: "Open Original Homepage",
    subtitle: "Open chrome's original homepage",
    type: SearchItemType.PREDEFINED_ACTIONS,
    icon: "Tab",
    iconType: IconType.MATERIAL_ICON,
  },
];

export default predefinedActions;
