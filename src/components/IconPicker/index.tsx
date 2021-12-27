import React, { useState } from "react";
import "emoji-mart/css/emoji-mart.css";
import MaterialIconPicker from "./MaterialIconPicker";
import EmojiPicker from "./EmojiPicker";
import { SvgIcon, Tab, Tabs, Typography } from "@mui/material";
import { Emoji } from "emoji-mart";
import { Box } from "@mui/system";
import { IconData, IconFontSize } from "./types";
import * as MIcon from "@mui/icons-material";
import { IconType } from "constant";

const materialIcons: { [key: string]: any } = MIcon;

interface props {
  selectedIcon?: IconData;
  onChangeIcon: (iconData: IconData) => void;
}

const IconPicker = ({ selectedIcon, onChangeIcon }: props) => {
  const [curTab, changeTab] = useState<IconType>(IconType.EMOJI);

  return (
    <Box display="flex" flexDirection="column">
      <Tabs
        value={curTab}
        onChange={(event, newValue) => changeTab(newValue)}
        variant="fullWidth"
      >
        <Tab label="Emoji" value={IconType.EMOJI} />
        <Tab label="Material Icon" value={IconType.MATERIAL_ICON} />
      </Tabs>

      {curTab === IconType.EMOJI && (
        <EmojiPicker
          onClickIcon={(iconId) =>
            onChangeIcon({ iconId, iconType: IconType.EMOJI })
          }
        />
      )}
      {curTab === IconType.MATERIAL_ICON && (
        <MaterialIconPicker
          onClickIcon={(iconId) =>
            onChangeIcon({ iconId, iconType: IconType.MATERIAL_ICON })
          }
        />
      )}

      <Box
        mt={1}
        display="inline-flex"
        justifyContent="flex-end"
        alignItems="center"
      >
        <Typography sx={{ mr: 1 }}>Selected Icon</Typography>
        <RenderIcon
          iconType={selectedIcon?.iconType}
          iconId={selectedIcon?.iconId}
          fontSize="small"
        />
        <RenderIcon
          iconType={selectedIcon?.iconType}
          iconId={selectedIcon?.iconId}
          fontSize="medium"
        />
        <RenderIcon
          iconType={selectedIcon?.iconType}
          iconId={selectedIcon?.iconId}
          fontSize="large"
        />
      </Box>
    </Box>
  );
};

export default IconPicker;

export const RenderIcon = (props: {
  iconType?: IconType;
  iconId?: string;
  fontSize?: IconFontSize;
  className?: string;
}) => {
  if (props.iconType === null || props.iconType === undefined) return null;

  switch (props.iconType) {
    case IconType.EMOJI:
      const sizeMap: { [key: string]: number } = {
        large: 27,
        medium: 18.5,
        small: 13,
      };
      return (
        <span className={props.className}>
          <Emoji
            emoji={props.iconId ?? ""}
            size={sizeMap[props.fontSize ?? "medium"]}
            native={true}
          />
        </span>
      );
    case IconType.MATERIAL_ICON:
      return (
        <SvgIcon
          component={materialIcons[props.iconId ?? ""]}
          fontSize={props.fontSize}
          className={props.className}
        />
      );
    default:
      break;
  }

  return null;
};
