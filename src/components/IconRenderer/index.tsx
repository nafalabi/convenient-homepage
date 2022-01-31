import React from "react";
import { Icon } from "@mui/material";
import { IconType } from "constant";
import { Emoji } from "emoji-mart";
import toSnakeCase from "app/utils/toSnakeCase";

export type IconFontSize = "large" | "medium" | "small";

const IconRenderer = (props: {
  iconType?: IconType;
  iconId?: string;
  fontSize?: IconFontSize;
  className?: string;
}) => {
  if (props.iconType === null || props.iconType === undefined) return null;

  switch (props.iconType) {
    case IconType.EMOJI:
      const sizeMapEmoji: { [key: string]: number } = {
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
      // the style provided from "fontSize" prop got overriden by material-icons' css
      // need to specifically set the size
      const sizeMapMI: { [key: string]: string } = {
        large: "2.25rem",
        medium: "1.5rem",
        small: "1.25rem",
      };
      let baseClassName = "material-icons";
      let iconName = toSnakeCase(props.iconId);

      if (iconName?.includes("_outlined")) {
        baseClassName += "-outlined";
      } else if (iconName?.includes("two_tone")) {
        baseClassName += "-two-tone";
      } else if (iconName?.includes("round")) {
        baseClassName += "-rounded";
      } else if (iconName?.includes("sharp")) {
        baseClassName += "-sharp";
      }

      return (
        <Icon
          className={props.className}
          baseClassName={baseClassName}
          fontSize={props.fontSize ?? "medium"}
          sx={{
            fontSize: `${sizeMapMI[props.fontSize ?? "medium"]} !important`,
          }}
        >
          {iconName}
        </Icon>
      );
    case IconType.URL:
      const sizeMapUrl: { [key: string]: number } = {
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
