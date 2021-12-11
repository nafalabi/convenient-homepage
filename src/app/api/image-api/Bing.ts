import axios from "axios";
import { IBackgroundSettings } from "../../storage/app-data/backgroundSettings";
import { AbstractImageAPI } from "./type";

class Bing implements AbstractImageAPI {
  apiUrl = "https://www.bing.com/HPImageArchive.aspx?format=js&n=8"; // it only returns 8 max even if we requested for 100
  parameters: IBackgroundSettings;

  constructor(parameters: IBackgroundSettings) {
    this.parameters = parameters;
  }

  async getUrl() {
    const imageIndex = this.parameters.bing_img_index || 0;
    const res = await axios.get(this.apiUrl + imageIndex);
    const uri = res.data.images[imageIndex].url;
    return "https://bing.com" + uri;
  }
}

export default Bing;
