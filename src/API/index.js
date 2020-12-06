import Pixabay from "./ImageAPI/Pixabay";
import Unsplash from "./ImageAPI/Unsplash";

const IMAGE_API = process.env.REACT_APP_IMAGE_API;

export const ImageAPI = {
  getImageBase64: () => {
    let ApiProvider = {};
    switch (IMAGE_API) {
      case "pixabay":
        ApiProvider = new Pixabay();
        break;
      case "unsplash":
        ApiProvider = new Unsplash();
        break;
      default:
        break;
    }
    return ApiProvider.getImageBase64();
  },
};
