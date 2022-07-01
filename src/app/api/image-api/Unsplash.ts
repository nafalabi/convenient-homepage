import { IBackgroundSettings } from "app/storage/app-data/backgroundSettings";
import { IBackgroundImage } from "app/db/model/BackgroundImage";
import QueryString from "app/utils/querystring";
import { ImageProvider } from "app/constant";
import { AbstractImageAPI } from "./type";

export enum UnsplashFetchMode {
  RANDOM = 0,
  SEARCH = 1,
}

class Unsplash implements AbstractImageAPI {
  parameters: IBackgroundSettings;

  constructor(parameters: IBackgroundSettings) {
    this.parameters = parameters;
  }

  async getListImage() {
    const result: IBackgroundImage[] = [];

    const parameters: { [key: string]: any } = {};
    let apiEndpoint = "";
    let paramPrefix = "";

    switch (this.parameters.unsplash_fetch_mode) {
      case UnsplashFetchMode.SEARCH:
        paramPrefix = "search_unsplash";
        apiEndpoint = "https://api.unsplash.com/search/photos";
        break;
      case UnsplashFetchMode.RANDOM:
      default:
        paramPrefix = "random_unsplash";
        apiEndpoint = "https://api.unsplash.com/photos/random";
        break;
    }

    for (const [key, val] of Object.entries(this.parameters).filter(([key]) =>
      key.includes(paramPrefix)
    )) {
      if (!val) continue;
      const trimmedKey = key.replace(`${paramPrefix}_`, "");
      parameters[trimmedKey] = val;
    }

    const qs = QueryString.stringify(parameters);

    const res = await fetch(`${apiEndpoint}?${qs}`, {
      headers: {
        "Accept-Version": "v1",
        Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_CLIENT_ID}`,
      },
    });
    const resJson = await res.json();
    const list =
      UnsplashFetchMode.RANDOM === this.parameters.unsplash_fetch_mode
        ? resJson
        : resJson.results;

    list.forEach((row: any) => {
      result.push({
        image_url: `${row.urls.raw}&q=85&w=1920`,
        preview_img_url: `${row.urls.raw}&q=85&w=400`,
        provider: ImageProvider.UNSPLASH,
        photographer: row.user.name,
        description: row.description ?? row.alt_description,
        utm_link: `${row.links.html}?utm_source=Convenient+Homepage&utm_medium=referral`,
        photographer_utm_link: `${row.user.links.html}?utm_source=Convenient+Homepage&utm_medium=referral`,
        raw_image_link: row.urls.full,
        download_notify_url: row.links.download_location,
      });
    });

    return result;
  }

  static async notifyDownload(downloadNotifyUrl?: string) {
    if (!downloadNotifyUrl) return null;
    // send a request to notify unsplash that there is a download request
    // https://help.unsplash.com/en/articles/2511258-guideline-triggering-a-download
    return fetch(downloadNotifyUrl, {
      headers: {
        "Accept-Version": "v1",
        Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_CLIENT_ID}`,
      },
    });
  }
}

export default Unsplash;
