import Pixabay from "./Pixabay";
import Unsplash from "./Unsplash";
import localData from "../../app/storage/localData";
import db from "../../app/storage/Dexie/db";
import Background from "../../app/storage/Dexie/Background";
import {
  BACKGROUND_PROVIDER_PIXABAY,
  BACKGROUND_PROVIDER_UNSPLASH,
} from "../../constant";

export const ImageAPI = {
  getImageBase64: async function () {
    const { provider, refresh_interval } = localData.backgroundProvider();

    let ApiProvider = {};
    switch (provider) {
      case BACKGROUND_PROVIDER_PIXABAY:
        ApiProvider = new Pixabay();
        break;
      case BACKGROUND_PROVIDER_UNSPLASH:
        ApiProvider = new Unsplash();
        break;
      default:
        break;
    }

    const activeBackground = await db.background
      .where("expireat")
      .above(Date.now() / 1000)
      .first();

    if (activeBackground) return activeBackground.content;

    const imageData = await ApiProvider.getImageBase64();

    const newBackground = new Background();
    newBackground.downloadtime = Math.floor(Date.now() / 1000);
    newBackground.expireat = Math.floor(Date.now() / 1000) + refresh_interval;
    newBackground.content = imageData;
    newBackground.save();

    return imageData;
  },
};

export default ImageAPI;
