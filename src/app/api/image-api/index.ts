import Pixabay from "./Pixabay";
import Unsplash from "./Unsplash";
import Bing from "./Bing";
import db from "../../storage/dexie/db";
import Background from "../../storage/dexie/Background";
import { ImageProvider } from "../../../constant";
import { AbstractImageAPI } from "./type";
import {
  backgroundSettingsDefault,
  IBackgroundSettings,
} from "../../storage/app-data/backgroundSettings";

class ImageAPI {
  apiProvider: AbstractImageAPI;
  parameters: IBackgroundSettings;

  constructor(parametersGiven: IBackgroundSettings) {
    switch (parametersGiven.provider) {
      case ImageProvider.PIXABAY:
        this.apiProvider = new Pixabay(parametersGiven);
        break;
      case ImageProvider.UNSPLASH:
        this.apiProvider = new Unsplash(parametersGiven);
        break;
      case ImageProvider.BING:
        this.apiProvider = new Bing(parametersGiven);
        break;
      default:
        this.apiProvider = new Unsplash(parametersGiven);
        break;
    }

    this.parameters = parametersGiven;
  }

  getNewBackground = async () => {
    const imageUrl = await this.apiProvider.getUrl();

    const arraybuffer = await (await fetch(imageUrl)).arrayBuffer();
    const imageBase64 = Buffer.from(arraybuffer).toString("base64");

    return { imageBase64 };
  };

  /**
   * Deprecated, replaced by dexie useLiveQuery + service worker
   */
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
    const { refresh_interval, refresh_interval_unit } = this.parameters;
    let expireInSec = 60 * 60; // default 1 hour

    switch (refresh_interval_unit) {
      case "days":
        expireInSec = refresh_interval * 24 * 60 * 60;
        break;
      case "hours":
        expireInSec = refresh_interval * 60 * 60;
        break;
      case "minutes":
        expireInSec = refresh_interval * 60;
        break;
      default:
        break;
    }

    const newBackground = new Background();
    newBackground.downloadtime = Math.floor(Date.now() / 1000);
    newBackground.expireat = Math.floor(Date.now() / 1000) + expireInSec;
    newBackground.content = imageBase64;
    await newBackground.save();
  };
}

export default ImageAPI;

declare global {
  var imgapi: ImageAPI;
}
global.imgapi = new ImageAPI(backgroundSettingsDefault);
