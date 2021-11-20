export const STORAGE_KEY_BACKGROUND_PROVIDER = "backgroundProvider";

export const backgroundProviderDefaults: IBackgroundProvider = {
  provider: 0,
  refresh_interval: 3000,

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

export interface IBackgroundProvider {
  provider: number;
  refresh_interval: number;

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
