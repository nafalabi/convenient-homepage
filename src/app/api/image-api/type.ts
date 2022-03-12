import { IBackgroundImage } from "app/db/model/BackgroundImage";

export interface AbstractImageAPI {
  parameters: object;
  getListImage: () => Promise<IBackgroundImage[]>;
}
