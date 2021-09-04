import axios from "axios";

class Pixabay {
  apiUrl = "https://pixabay.com/api/?";
  parameters = {};

  constructor(parameters) {
    this.parameters = parameters;
  }

  async getUrl() {
    let { pixabay_apikey, pixabay_per_page, ...rawParams } = this.parameters;
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
    const res = await axios.get(fullUrl);
    const random = Math.floor(Math.random() * pixabay_per_page);
    return res.data.hits[random].largeImageURL;
  }
}

export default Pixabay;
