import { ImageProvider } from "constant";

const getImgProviderName = (provider?: ImageProvider) => {
  switch (provider) {
    case ImageProvider.BING:
      return "Bing";
    case ImageProvider.PIXABAY:
      return "Pixabay";
    case ImageProvider.UNSPLASH:
      return "Unsplash";
    default:
      return "";
  }
};

export default getImgProviderName;
