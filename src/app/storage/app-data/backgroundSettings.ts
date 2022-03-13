import { ImageProvider } from "constant";
import setOrGet from "./abstract";
import { TimeCycleUnits } from "constant";
import { UnsplashFetchMode } from "app/api/image-api/Unsplash";

export type BackgroundCycleIntervalUnit = Exclude<TimeCycleUnits, "weeks">;

export type BackgroundRefreshListIntervalUnit = Exclude<
  TimeCycleUnits,
  "minutes"
>;

export interface IBackgroundSettings {
  selected_providers: ImageProvider[];
  cycle_interval: number;
  cycle_interval_unit: BackgroundCycleIntervalUnit;
  refresh_list_interval: number;
  refresh_list_interval_unit: BackgroundRefreshListIntervalUnit;

  unsplash_fetch_mode: UnsplashFetchMode;

  search_unsplash_query: string;
  search_unsplash_page: number;
  search_unsplash_per_page: number;
  search_unsplash_order_by: string;
  search_unsplash_orientation: string;

  random_unsplash_collections?: string;
  random_unsplash_topics: string;
  random_unsplash_query: string;
  random_unsplash_orientation: string;
  random_unsplash_content_filter: string;
  random_unsplash_count: number;

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
  selected_providers: [ImageProvider.UNSPLASH, ImageProvider.BING],
  cycle_interval: 2,
  cycle_interval_unit: "hours",
  refresh_list_interval: 5,
  refresh_list_interval_unit: "days",

  unsplash_fetch_mode: UnsplashFetchMode.RANDOM,

  search_unsplash_query: "nature",
  search_unsplash_page: 1,
  search_unsplash_per_page: 30,
  search_unsplash_order_by: "relevant",
  search_unsplash_orientation: "landscape",

  random_unsplash_collections: undefined,
  random_unsplash_topics: "nature",
  random_unsplash_query: "nature",
  random_unsplash_orientation: "landscape",
  random_unsplash_content_filter: "low",
  random_unsplash_count: 30,

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
