import React from "react";
import { SvgIcon } from "@mui/material";
import { IconType } from "constant";
import { Emoji } from "emoji-mart";
import * as MIcon from "@mui/icons-material";

export type MIconKeys = keyof typeof MIcon;

export type IconFontSize = "large" | "medium" | "small";

const materialIcons: { [key: string]: any } = MIcon;

const IconRenderer = (props: {
  iconType?: IconType;
  iconId?: MIconKeys | string;
  fontSize?: IconFontSize;
  className?: string;
}) => {
  if (props.iconType === null || props.iconType === undefined) return null;

  switch (props.iconType) {
    case IconType.EMOJI:
      let sizeMapEmoji: { [key: string]: number } = {
        large: 27,
        medium: 18.5,
        small: 13,
      };
      return (
        <span className={props.className}>
          <Emoji
            emoji={props.iconId ?? ""}
            size={sizeMapEmoji[props.fontSize ?? "medium"]}
            native={true}
          />
        </span>
      );
    case IconType.MATERIAL_ICON:
      return (
        <SvgIcon
          component={materialIcons[props.iconId ?? ""]}
          fontSize={props.fontSize ?? "medium"}
          className={props.className}
        />
      );
    case IconType.URL:
      let sizeMapUrl: { [key: string]: number } = {
        large: 27,
        medium: 18.5,
        small: 13,
      };
      return (
        <img
          src={props.iconId}
          alt="favicon"
          className={props.className}
          style={{
            height: sizeMapUrl[props.fontSize ?? "medium"],
            width: sizeMapUrl[props.fontSize ?? "medium"],
            alignSelf: "center",
          }}
        />
      );
    default:
      break;
  }

  return null;
};

export default IconRenderer;
