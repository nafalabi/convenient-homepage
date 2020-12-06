import axios from "axios";

class Pixabay {
  apiUrl = "https://pixabay.com/api/?";
  apiKey = process.env.REACT_APP_PIXABAY_API_KEY;
  params = {
    q: "landscape",
    category: "background",
    image_type: "photo",
    per_page: "10",
    page: "1",
    editors_choice: "true",
    min_width: "1920",
  };

  async getImageBase64() {
    const params = Object.entries(this.params).reduce((stream, [key, value]) =>
      encodeURI(`${stream}&${key}=${value}`)
    );
    const res = await axios.get(`${this.apiUrl}key=${this.apiKey}${params}`);
    const random = Math.floor(Math.random() * this.params.per_page);
    const imageStream = await axios({
      method: "GET",
      url: res.data.hits[random].largeImageURL,
      responseType: "arraybuffer",
    });

    return new Buffer(imageStream.data, "binary").toString("base64");
  }
}

export default Pixabay;
