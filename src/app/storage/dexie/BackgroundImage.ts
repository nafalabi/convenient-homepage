import { ImageProvider } from "constant";
import dexieDB from "./db";

export interface IBackgroundImage {
  image_url?: string;
  preview_img_url?: string;
  provider?: ImageProvider;
  photographer?: string;
  photo_location?: string;
  description?: string;
  utm_link?: string;
  photographer_utm_link?: string;
  download_notify_url?: string;
  raw_image_link?: string;
}

class BackgroundImage implements IBackgroundImage {
  id?: number;
  image_url?: string;
  preview_img_url?: string;
  provider?: ImageProvider;
  photographer?: string;
  photo_location?: string;
  description?: string;
  utm_link?: string;
  photographer_utm_link?: string;
  download_notify_url?: string;
  raw_image_link?: string;
  active: number; // cant index boolean, use number instead
  activated_at: number; // epoch timestamp, -1 when not activated

  constructor(args: IBackgroundImage) {
    Object.assign(this, args);
    this.active = 0;
    this.activated_at = -1;
  }

  async activate() {
    this.active = 1;
    this.activated_at = Math.floor(Date.now() / 1000);
    return await this.save();
  }

  async deactivate() {
    this.active = 0;
    return await this.save();
  }

  async save() {
    const id = await dexieDB.backgroundimage.put(this, this.id);
    this.id = id;
    return id;
  }

  async delete() {
    return await dexieDB.backgroundimage.delete(this.id ?? -1);
  }
}

dexieDB.backgroundimage.mapToClass(BackgroundImage);

export default BackgroundImage;
