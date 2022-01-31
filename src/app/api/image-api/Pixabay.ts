import { IBackgroundSettings } from "app/storage/app-data/backgroundSettings";
import { IBackgroundImage } from "app/storage/dexie/BackgroundImage";
import QueryString from "app/utils/querystring";
import { ImageProvider } from "constant";
import { AbstractImageAPI } from "./type";

class Pixabay implements AbstractImageAPI {
  parameters: IBackgroundSettings;

  constructor(parameters: IBackgroundSettings) {
    this.parameters = parameters;
  }

  async getListImage() {
    const result: IBackgroundImage[] = [];

    const qs = QueryString.stringify({
      key: `${process.env.REACT_APP_PIXABAY_API_KEY}`,
      q: this.parameters.pixabay_q,
      image_type: this.parameters.pixabay_image_type,
      orientation: this.parameters.pixabay_orientation,
      category: this.parameters.pixabay_category,
      min_width: this.parameters.pixabay_min_width,
      editors_choice: this.parameters.pixabay_editors_choice,
      order: this.parameters.pixabay_order,
      page: this.parameters.pixabay_page,
      per_page: this.parameters.pixabay_per_page,
    });

    const res = await fetch(`https://pixabay.com/api/?${qs}`);
    const resJson = await res.json();

    resJson.hits.forEach((row: any) => {
      result.push({
        image_url: row.largeImageURL,
        preview_img_url: row.webformatURL,
        provider: ImageProvider.PIXABAY,
        photographer: row.user,
        utm_link: row.pageURL,
        raw_image_link: row.largeImageURL,
        description: row.user,
      });
    });
    return result;
  }
}

export default Pixabay;
