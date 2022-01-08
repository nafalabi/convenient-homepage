import { ImageProvider } from "constant";
import setOrGet from "./abstract";

export type BackgroundCycleIntervalUnit = "days" | "hours" | "minutes";

export type BackgroundRefreshListIntervalUnit = "weeks" | "days" | "hours";

export interface IBackgroundSettings {
  selected_providers: ImageProvider[];
  cycle_interval: number;
  cycle_interval_unit: BackgroundCycleIntervalUnit;
  refresh_list_interval: number;
  refresh_list_interval_unit: BackgroundRefreshListIntervalUnit;

  unsplash_query: string;
  unsplash_page: number;
  unsplash_per_page: number;
  unsplash_order_by: string;
  unsplash_orientation: string;

  pixabay_q: string;
  pixabay_image_type: string;
  pixabay_orientation: string;
  pixabay_category: string;
  pixabay_min_width: number;
  pixabay_editors_choice: boolean;
  pixabay_order: string;
  pixabay_page: number;
  pixabay_per_page: number;
}

export const backgroundSettingsDefault: IBackgroundSettings = {
  selected_providers: [
    ImageProvider.UNSPLASH,
    ImageProvider.BING,
    ImageProvider.PIXABAY,
  ],
  cycle_interval: 2,
  cycle_interval_unit: "hours",
  refresh_list_interval: 5,
  refresh_list_interval_unit: "days",

  unsplash_query: "nature",
  unsplash_page: 1,
  unsplash_per_page: 30,
  unsplash_order_by: "relevant",
  unsplash_orientation: "landscape",

  pixabay_q: "nature",
  pixabay_image_type: "photo",
  pixabay_orientation: "horizontal",
  pixabay_category: "backgrounds",
  pixabay_min_width: 1920,
  pixabay_editors_choice: true,
  pixabay_order: "popular",
  pixabay_page: 1,
  pixabay_per_page: 30,
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
