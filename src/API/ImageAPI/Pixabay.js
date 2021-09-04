import axios from "axios";

class Pixabay {
  apiUrl = "https://pixabay.com/api/?";
  parameters = {};

  constructor(parameters) {
    this.parameters = parameters;
  }

  generateUrl() {
    let { pixabay_apikey, ...rawParams } = this.parameters;
    rawParams.pixabay_page = Math.floor(Math.random() * 11);
    const paramsString = Object.entries(rawParams).reduce(
      (stream, [key, value]) => {
        if (!key.includes("pixabay_")) return "";
        key = key.replace("pixabay_", "");
        if (typeof stream == "object") stream = `${stream[0]}=${stream[1]}`;
        return encodeURI(`${stream}&${key}=${value}`);
      }
    );
    const fullUrl = `${this.apiUrl}key=${pixabay_apikey}&${paramsString}`;
    return fullUrl;
  }

  async getImageBase64() {
    let { pixabay_per_page } = this.parameters;
    const res = await axios.get(this.generateUrl());
    const random = Math.floor(Math.random() * pixabay_per_page);
    const imageStream = await axios({
      method: "GET",
      url: res.data.hits[random].largeImageURL,
      responseType: "arraybuffer",
    });

    return Buffer.from(imageStream.data, "binary").toString("base64");
  }
}

export default Pixabay;
