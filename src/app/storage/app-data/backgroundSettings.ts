import { ImageProvider } from "../../../constant";
import setOrGet from "./abstract";

export type BackgroundRefreshIntervalUnit = "days" | "hours" | "minutes";

export type BackgroundLifetimeUnit = "weeks" | "days" | "hours";

export interface IBackgroundSettings {
  provider: ImageProvider;
  refresh_interval: number;
  refresh_interval_unit: BackgroundRefreshIntervalUnit;
  background_lifetime: number;
  background_lifetime_unit: BackgroundLifetimeUnit;

  unsplash_keyword: string;
  unsplash_dimension: string;
  unsplash_search_retention?: "daily" | "weekly" | null;

  pixabay_apikey: string;
  pixabay_q: string;
  pixabay_category: string;
  pixabay_image_type: string;
  pixabay_per_page: number;
  pixabay_page: number;
  pixabay_editors_choice: boolean;
  pixabay_min_width: number;

  bing_img_index: number;
}

export const backgroundSettingsDefault: IBackgroundSettings = {
  provider: ImageProvider.UNSPLASH,
  refresh_interval: 2,
  refresh_interval_unit: "hours",
  background_lifetime: 5,
  background_lifetime_unit: "days",

  unsplash_keyword: "nature",
  unsplash_dimension: "1600x900",
  unsplash_search_retention: null,

  pixabay_apikey: "",
  pixabay_q: "landscape",
  pixabay_category: "background",
  pixabay_image_type: "photo",
  pixabay_per_page: 10,
  pixabay_page: 1,
  pixabay_editors_choice: true,
  pixabay_min_width: 1920,

  bing_img_index: 0,
};

export const STORAGE_KEY = "backgroundSettings";

/**
 * Background settings
 * ----
 * Set or get background settings\
 * if val is defined it will be set function\
 * if val is not defined it will be get function
 */
const backgroundSettings = (val?: IBackgroundSettings) => {
  return setOrGet(STORAGE_KEY, backgroundSettingsDefault, val);
};

export default backgroundSettings;
