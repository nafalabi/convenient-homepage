import ImageAPI from "../app/api/image-api";
import appData from "../app/storage/app-data";

const retrieveBackground = async () => {
  const backgroundSettings = await appData.backgroundSettings();
  const imageApi = new ImageAPI(backgroundSettings);

  const newBackground = await imageApi.getNewBackground();
  imageApi.storeAndSaveAsActive(newBackground.imageBase64);
};

export default retrieveBackground;
