import { IconType } from "constant";

export interface IconDataMaterial {
  importName: string;
  name: string;
  theme: string;
  Component: any;
}

export type IconData =
  | {
      iconId: string;
      iconType: IconType;
    }
  | null
  | undefined;
