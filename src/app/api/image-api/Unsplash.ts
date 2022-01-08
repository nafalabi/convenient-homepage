import { IBackgroundSettings } from "app/storage/app-data/backgroundSettings";
import { IBackgroundImage } from "app/storage/dexie/BackgroundImage";
import QueryString from "app/utils/querystring";
import { ImageProvider } from "constant";
import { AbstractImageAPI } from "./type";

class Unsplash implements AbstractImageAPI {
  apiUrl = "https://source.unsplash.com/";
  parameters: IBackgroundSettings;

  constructor(parameters: IBackgroundSettings) {
    this.parameters = parameters;
  }

  async getListImage() {
    const result: IBackgroundImage[] = [];

    const qs = QueryString.stringify({
      query: this.parameters.unsplash_query,
      page: this.parameters.unsplash_page,
      per_page: this.parameters.unsplash_per_page,
      order_by: this.parameters.unsplash_order_by,
      orientation: this.parameters.unsplash_orientation,
    });

    const res = await fetch(`https://api.unsplash.com/search/photos?${qs}`, {
      headers: {
        "Accept-Version": "v1",
        Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_CLIENT_ID}`,
      },
    });
    const resJson = await res.json();

    resJson.results.forEach((row: any) => {
      result.push({
        image_url: `${row.urls.raw}&q=85&w=1920`,
        preview_img_url: `${row.urls.raw}&q=85&w=400`,
        provider: ImageProvider.UNSPLASH,
        photographer: row.user.name,
        utm_link: `${row.links.html}?utm_source=Convenient+Homepage&utm_medium=referral`,
      });
    });

    return result;
  }
}

export default Unsplash;
