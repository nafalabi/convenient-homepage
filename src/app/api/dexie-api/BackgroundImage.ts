import appData from "app/storage/app-data";
import cacheStorage from "app/storage/cache-storage";
import BackgroundImage from "app/storage/dexie/BackgroundImage";
import dexieDB from "app/storage/dexie/db";
import ImageAPI from "../image-api";

class DexieBackgroundImageAPI {
  async refreshBackgroundList() {
    const settings = await appData.backgroundSettings();
    const imgApi = new ImageAPI(settings);
    const list = await imgApi.getImageList();

    // clear old data
    await dexieDB.backgroundimage.clear();
    await cacheStorage.backgroundImage.clearCache();

    const bgInstList = [];
    // convert plain obj to dexie row instance
    for (const image of list) {
      const imgInst = new BackgroundImage(image);
      bgInstList.push(imgInst);
    }

    // activate one random image
    const bgActive = Math.floor(Math.random() * bgInstList.length);
    await bgInstList[bgActive].activate();

    // push all the images to dexie
    return await dexieDB.backgroundimage.bulkPut(bgInstList);
  }

  async getCurActiveImage() {
    const curImage = await dexieDB.backgroundimage.where({ active: 1 }).first();
    return curImage;
  }

  async setAsActive(id?: number) {
    if (id === undefined) return false;

    const prevImage = await this.getCurActiveImage();
    const newImage = await dexieDB.backgroundimage.get(id);

    // Caching the image
    const res = await cacheStorage.backgroundImage.getOrSet(
      newImage?.image_url ?? "null"
    );
    // failed caching
    if (res.status !== 200) return false;

    return dexieDB.transaction("rw", dexieDB.backgroundimage, async () => {
      await prevImage?.deactivate();
      await newImage?.activate();
      return true;
    });
  }

  async cycleBackground(iteration: number = 0) {
    const nextImageIds = await dexieDB.backgroundimage
      .toCollection()
      .primaryKeys();

    if (nextImageIds.length === 0)
      throw new Error("Background image list is empty");

    if (iteration >= 5) throw new Error("Failed to rotate background image");

    const nextImageId =
      nextImageIds[Math.floor(Math.random() * nextImageIds.length)];

    const success = await this.setAsActive(nextImageId);

    // failed, try again
    if (!success) await this.cycleBackground(iteration + 1);
  }
}

export default DexieBackgroundImageAPI;
