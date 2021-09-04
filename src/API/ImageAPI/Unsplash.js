class Unsplash {
  apiUrl = "https://source.unsplash.com/";
  parameters = {};

  constructor(parameters) {
    this.parameters = parameters;
  }

  getUrl() {
    let {
      unsplash_keyword: keyword,
      unsplash_dimension: dimension,
      unsplash_search_retention: retention,
    } = this.parameters;
    retention = this.search_retention ? `${this.search_retention}/` : "";
    return `${this.apiUrl}${dimension}/${retention}?${keyword}`;
  }
}

export default Unsplash;
