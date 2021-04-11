import Pixabay from "./Pixabay";
import Unsplash from "./Unsplash";
import localData from "../../app/storage/localData";
import {
  BACKGROUND_PROVIDER_PIXABAY,
  BACKGROUND_PROVIDER_UNSPLASH,
} from "../../constant";

// const IMAGE_API = process.env.REACT_APP_IMAGE_API;

export const ImageAPI = {
  getImageBase64: () => {
    const { provider } = localData.backgroundProvider();

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
    return ApiProvider.getImageBase64();
  },
};

export default ImageAPI;
