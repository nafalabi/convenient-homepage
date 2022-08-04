import appData from "app/storage/app-data";
import cacheStorage from "app/cache";
import BackgroundImageModel from "app/db/model/BackgroundImage";
import dexieDB from "app/db";
import { ImageProvider } from "app/constant";
import ImageAPI from "app/api/image-api";
import Unsplash from "app/api/image-api/Unsplash";

class BackgroundImageController {
  static async refreshBackgroundList() {
    const settings = await appData.backgroundSettings();
    const imgApi = new ImageAPI(settings);
    const list = await imgApi.getImageList();

    // clear old data
    await dexieDB.backgroundimage.clear();
    await cacheStorage.backgroundImage.clearCache();

    const bgInstList = [];
    // convert plain obj to dexie row instance
    for (const image of list) {
      const imgInst = new BackgroundImageModel(image);
      bgInstList.push(imgInst);
    }

    // activate one random image
    const activeIndex = Math.floor(Math.random() * bgInstList.length);
    await bgInstList[activeIndex].activate();

    // caching active image
    const res = await fetch(bgInstList[activeIndex]?.image_url ?? "null");
    if (res.status === 200)
      await cacheStorage.backgroundImage.set(
        bgInstList[activeIndex]?.image_url ?? "",
        res
      );

    // push all the images to dexie
    return await dexieDB.backgroundimage.bulkPut(bgInstList);
  }

  static async getCurActiveImage() {
    const curImage = await dexieDB.backgroundimage.where({ active: 1 }).first();
    return curImage;
  }

  static async setAsActive(id?: number) {
    if (id === undefined) return false;

    const prevImage = await this.getCurActiveImage();
    const newImage = await dexieDB.backgroundimage.get(id);

    // Caching the image
    const res = await cacheStorage.backgroundImage.getOrSet(
      newImage?.image_url ?? "null"
    );
    // failed caching
    if (res.status !== 200) return false;

    // notify download (Unsplash only)
    if (newImage?.provider === ImageProvider.UNSPLASH) {
      Unsplash.notifyDownload(newImage.download_notify_url);
    }

    return dexieDB.transaction("rw", dexieDB.backgroundimage, async () => {
      await prevImage?.deactivate();
      await newImage?.activate();
      return true;
    });
  }

  static async cycleBackground(iteration: number = 0) {
    const nextImageIds = await dexieDB.backgroundimage
      .where({ activated_at: -1 })
      .primaryKeys();

    if (nextImageIds.length === 0) {
      // all background images have already activated, reset them all
      dexieDB.backgroundimage.toCollection().modify({ activated_at: -1 });
    }

    if (iteration >= 5) throw new Error("Failed to rotate background image");

    const nextImageId =
      nextImageIds[Math.floor(Math.random() * nextImageIds.length)];

    const success = await this.setAsActive(nextImageId);

    // failed, try again
    if (!success) await this.cycleBackground(iteration + 1);
  }

  static async downloadImage(id?: number) {
    if (id === undefined) return false;
    const image = await dexieDB.backgroundimage.get(id);

    if (image?.provider === ImageProvider.UNSPLASH) {
      Unsplash.notifyDownload(image.download_notify_url);
    }

    chrome.downloads.download({ url: image?.image_url ?? "" });
  }
}

export default BackgroundImageController;
