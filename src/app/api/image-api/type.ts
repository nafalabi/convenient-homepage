import { IBackgroundImage } from "app/storage/dexie/BackgroundImage";

export interface AbstractImageAPI {
  parameters: object;
  getListImage: () => Promise<IBackgroundImage[]>;
}
