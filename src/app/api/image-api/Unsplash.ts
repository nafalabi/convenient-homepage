import { IBackgroundSettings } from "app/storage/app-data/backgroundSettings";
import { AbstractImageAPI } from "./type";

class Unsplash implements AbstractImageAPI {
  apiUrl = "https://source.unsplash.com/";
  parameters: IBackgroundSettings;

  constructor(parameters: IBackgroundSettings) {
    this.parameters = parameters;
  }

  async getUrl() {
    let {
      unsplash_keyword: keyword,
      unsplash_dimension: dimension,
      unsplash_search_retention,
    } = this.parameters;

    let retention = unsplash_search_retention
      ? `${unsplash_search_retention}/`
      : "";

    return `${this.apiUrl}${dimension}/${retention}?${keyword}`;
  }
}

export default Unsplash;
