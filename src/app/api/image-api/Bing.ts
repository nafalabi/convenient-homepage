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
      let photographer = "";
      let description = "";

      // format of row.copyright : "image description ... (\u00a9 copyright or photographer)"
      const match = (row.copyright ?? "").match(/\(([\xa9].*?)\)/);

      if (match) {
        photographer = match[1];
        description = (row.copyright ?? "").replace(match[0], "");
      } else {
        photographer = row.copyright;
      }

      result.push({
        image_url: "https://bing.com" + row.url,
        preview_img_url: "https://bing.com" + row.url,
        provider: ImageProvider.BING,
        photographer,
        description,
        utm_link: row.copyrightlink,
        raw_image_link: "https://bing.com" + row.url,
      });
    });

    return result;
  }
}

export default Bing;
