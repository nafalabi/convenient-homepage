import Pixabay from "./Pixabay";
import Unsplash from "./Unsplash";
import Bing from "./Bing";
import { AbstractImageAPI } from "./type";
import {
  backgroundSettingsDefault,
  IBackgroundSettings,
} from "app/storage/app-data/backgroundSettings";
import { IBackgroundImage } from "app/db/model/BackgroundImage";
import { ImageProvider } from "constant";

class ImageAPI {
  parameters: IBackgroundSettings;
  providers: AbstractImageAPI[] = [];

  constructor(parametersGiven: IBackgroundSettings) {
    for (const imgProv of parametersGiven.selected_providers) {
      switch (imgProv) {
        case ImageProvider.UNSPLASH:
          this.providers.push(new Unsplash(parametersGiven));
          break;
        case ImageProvider.PIXABAY:
          this.providers.push(new Pixabay(parametersGiven));
          break;
        case ImageProvider.BING:
          this.providers.push(new Bing(parametersGiven));
          break;
        default:
          break;
      }
    }

    this.parameters = parametersGiven;
  }

  getImageList = async () => {
    let result: IBackgroundImage[] = [];

    for (const provider of this.providers) {
      const list = await provider.getListImage();
      result = [...result, ...list];
    }

    return result;
  };
}

export default ImageAPI;
