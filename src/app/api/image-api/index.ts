import Pixabay from "./Pixabay";
import Unsplash from "./Unsplash";
import Bing from "./Bing";
import localData from "../../storage/local-data";
import db from "../../storage/dexie/db";
import Background from "../../storage/dexie/Background";
import {
  BACKGROUND_PROVIDER_BING,
  BACKGROUND_PROVIDER_PIXABAY,
  BACKGROUND_PROVIDER_UNSPLASH,
} from "../../../constant";
import Axios from "axios";
import { AbstractImageAPI } from "./type";
import { IBackgroundProvider } from "../../storage/local-data/default-values/background-provider";

class ImageAPI {
  apiProvider: AbstractImageAPI;
  refreshInterval = 0;

  constructor(parametersGiven: IBackgroundProvider) {
    const parameters = parametersGiven || localData.backgroundProvider();
    const { provider, refresh_interval } = parameters;

    switch (provider) {
      case BACKGROUND_PROVIDER_PIXABAY:
        this.apiProvider = new Pixabay(parameters);
        break;
      case BACKGROUND_PROVIDER_UNSPLASH:
        this.apiProvider = new Unsplash(parameters);
        break;
      case BACKGROUND_PROVIDER_BING:
        this.apiProvider = new Bing(parameters);
        break;
      default:
        this.apiProvider = new Unsplash(parameters);
        break;
    }

    this.refreshInterval = refresh_interval;
  }

  getNewBackground = async () => {
    const imageUrl = await this.apiProvider.getUrl();
    const response = await Axios({
      method: "GET",
      url: imageUrl,
      responseType: "arraybuffer",
    });
    const imageBase64 = Buffer.from(response.data, "binary").toString("base64");
    const url: string = response.request?.responseURL;
    return { imageBase64, url };
  };

  getActiveBackground = async () => {
    const activeBackground = (
      await db.background
        .where("expireat")
        .above(Date.now() / 1000)
        .reverse()
        .sortBy("expireat")
    )[0];

    if (activeBackground) return activeBackground.content;

    const { imageBase64 } = await this.getNewBackground();

    this.storeAndSaveAsActive(imageBase64);

    return imageBase64;
  };

  storeAndSaveAsActive = async (imageBase64: string) => {
    const newBackground = new Background();
    newBackground.downloadtime = Math.floor(Date.now() / 1000);
    newBackground.expireat =
      Math.floor(Date.now() / 1000) + this.refreshInterval;
    newBackground.content = imageBase64;
    await newBackground.save();
  };
}

export default ImageAPI;
