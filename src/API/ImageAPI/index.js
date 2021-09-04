import Pixabay from "./Pixabay";
import Unsplash from "./Unsplash";
import localData from "../../app/storage/localData";
import db from "../../app/storage/Dexie/db";
import Background from "../../app/storage/Dexie/Background";
import {
  BACKGROUND_PROVIDER_PIXABAY,
  BACKGROUND_PROVIDER_UNSPLASH,
} from "../../constant";

class ImageAPI {
  apiProvider = {};
  refreshInterval = 0;

  constructor(parametersGiven) {
    const parameters = parametersGiven || localData.backgroundProvider();
    const { provider, refresh_interval } = parameters;

    switch (provider) {
      case BACKGROUND_PROVIDER_PIXABAY:
        this.apiProvider = new Pixabay(parameters);
        break;
      case BACKGROUND_PROVIDER_UNSPLASH:
        this.apiProvider = new Unsplash(parameters);
        break;
      default:
        this.apiProvider = new Unsplash(parameters);
        break;
    }

    this.refreshInterval = refresh_interval;
  }

  getNewBackground = async () => {
    return await this.apiProvider.getImageBase64();
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

    const imageData = await this.getNewBackground();

    this.storeAndSaveAsActive(imageData);

    return imageData;
  };

  storeAndSaveAsActive = async (imageData) => {
    const newBackground = new Background();
    newBackground.downloadtime = Math.floor(Date.now() / 1000);
    newBackground.expireat =
      Math.floor(Date.now() / 1000) + this.refreshInterval;
    newBackground.content = imageData;
    await newBackground.save();
  };
}

export default ImageAPI;
