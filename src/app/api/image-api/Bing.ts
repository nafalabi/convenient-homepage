import { IBackgroundSettings } from "app/storage/app-data/backgroundSettings";
import { ImageProvider } from "constant";
import { AbstractImageAPI } from "./type";
import { IBackgroundImage } from "app/storage/dexie/BackgroundImage";

class Bing implements AbstractImageAPI {
  apiUrl = "https://www.bing.com/HPImageArchive.aspx?format=js&n=8"; // it only returns 8 max even if we requested for 100
  parameters: IBackgroundSettings;

  constructor(parameters: IBackgroundSettings) {
    this.parameters = parameters;
  }

  async getListImage() {
    const result: IBackgroundImage[] = [];

    const res = await fetch(
      "https://www.bing.com/HPImageArchive.aspx?format=js&n=100"
    );
    const resJson = await res.json();

    resJson.images.forEach((row: any) => {
      result.push({
        image_url: "https://bing.com" + row.url,
        preview_img_url: "https://bing.com" + row.url,
        provider: ImageProvider.BING,
        photographer: row.copyright,
        utm_link: row.copyrightlink,
      });
    });

    return result;
  }
}

export default Bing;
