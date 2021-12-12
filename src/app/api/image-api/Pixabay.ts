import { IBackgroundSettings } from "../../storage/app-data/backgroundSettings";
import { AbstractImageAPI } from "./type";

class Pixabay implements AbstractImageAPI {
  apiUrl = "https://pixabay.com/api/?";
  parameters: IBackgroundSettings;

  constructor(parameters: IBackgroundSettings) {
    this.parameters = parameters;
  }

  async getUrl() {
    let { pixabay_apikey, pixabay_per_page, ...rawParams } = this.parameters;

    const showPerPage = Math.floor(Math.random() * 11);
    rawParams.pixabay_page = showPerPage;

    const paramsString = Object.entries(rawParams).reduce(
      (stream, [key, value]) => {
        if (!key.includes("pixabay_")) return "";
        key = key.replace("pixabay_", "");
        if (typeof stream == "object") stream = `${stream[0]}=${stream[1]}`;
        return encodeURI(`${stream}&${key}=${value}`);
      },
      ""
    );
    const fullUrl = `${this.apiUrl}key=${pixabay_apikey}&${paramsString}`;
    const res = await (await fetch(fullUrl)).json();
    const random = Math.floor(Math.random() * pixabay_per_page);
    return res.hits[random].largeImageURL;
  }
}

export default Pixabay;
