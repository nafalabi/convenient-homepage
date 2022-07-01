import { IconType } from "app/constant";

export interface IconDataMaterial {
  importName: string;
  name: string;
  theme: string;
  renderName: string;
}

export type IconData =
  | {
      iconId: string;
      iconType: IconType;
    }
  | null
  | undefined;
