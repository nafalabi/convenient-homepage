import axios from "axios";

class Bing {
  apiUrl = "https://www.bing.com/HPImageArchive.aspx?format=js&n=8"; // it only returns 8 max even if we requested for 100
  parameters = {};

  constructor(parameters) {
    this.parameters = parameters;
  }

  async getUrl() {
    const imageIndex = this.parameters.bing_img_index || 0;
    const res = await axios.get(this.apiUrl + imageIndex);
    console.log(res);
    console.log(res.data);
    const uri = res.data.images[imageIndex].url;
    return "https://bing.com" + uri;
  }
}

export default Bing;
