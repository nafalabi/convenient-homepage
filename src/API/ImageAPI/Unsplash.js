import axios from "axios";

class Unsplash {
  apiUrl = "https://source.unsplash.com/";
  minImageSize = "1600x900";
  searchRetention = null;
  keyword = ["nature", "landscape"];

  generateUrl() {
    const retention =
      this.searchRetention !== null ? `${this.searchRetention}/` : "";
    const keyword = this.keyword.join(",");
    return `${this.apiUrl}${this.minImageSize}/${retention}?${keyword}`;
  }

  async getImageBase64() {
    const retention =
      this.searchRetention !== null ? `${this.searchRetention}/` : "";
    const keyword = this.keyword.join(",");
    const imageStream = await axios({
      method: "GET",
      url: `${this.apiUrl}${this.minImageSize}/${retention}?${keyword}`,
      responseType: "arraybuffer",
    });

    return new Buffer(imageStream.data, "binary").toString("base64");
  }
}

export default Unsplash;
