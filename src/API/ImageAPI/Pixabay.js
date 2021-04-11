import axios from "axios";
import localData from "../../app/storage/localData";

class Pixabay {
  apiUrl = "https://pixabay.com/api/?";

  generateUrl() {
    let { pixabay_apikey, ...rawParams } = localData.backgroundProvider();
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
    let { pixabay_per_page } = localData.backgroundProvider();
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
