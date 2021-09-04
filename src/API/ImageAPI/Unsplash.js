import axios from "axios";

class Unsplash {
  apiUrl = "https://source.unsplash.com/";
  parameters = {};

  constructor(parameters) {
    this.parameters = parameters;
  }

  generateUrl() {
    let {
      unsplash_keyword: keyword,
      unsplash_dimension: dimension,
      unsplash_search_retention: retention,
    } = this.parameters;
    retention = this.search_retention ? `${this.search_retention}/` : "";
    return `${this.apiUrl}${dimension}/${retention}?${keyword}`;
  }

  async getImageBase64() {
    const imageStream = await axios({
      method: "GET",
      url: this.generateUrl(),
      responseType: "arraybuffer",
    });

    const base64Image = Buffer.from(imageStream.data, "binary").toString(
      "base64"
    );
    return base64Image;
  }
}

export default Unsplash;
