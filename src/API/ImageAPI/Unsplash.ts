import { IBackgroundProvider } from "../../app/storage/local-data/default-values/background-provider";
import { AbstractImageAPI } from "./type";

class Unsplash implements AbstractImageAPI {
  apiUrl = "https://source.unsplash.com/";
  parameters: IBackgroundProvider;

  constructor(parameters: IBackgroundProvider) {
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
