import { IconType } from "constant";

export enum SearchItemType {
  BOOKMARKS,
  NOTE,
  PREDEFINED_ACTIONS,
}

export interface SearchItem {
  id: string | number;
  type: SearchItemType;
  title: string;
  subtitle: string;
  icon?: string;
  iconType?: IconType;
}
