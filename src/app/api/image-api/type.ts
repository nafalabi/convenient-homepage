import { IBackgroundImage } from "app/db/schema/BackgroundImage";

export interface AbstractImageAPI {
  parameters: object;
  getListImage: () => Promise<IBackgroundImage[]>;
}
