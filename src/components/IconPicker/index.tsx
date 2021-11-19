import React, { useState } from "react";
import "emoji-mart/css/emoji-mart.css";
import MaterialIconPicker from "./MaterialIconPicker";
import EmojiPicker from "./EmojiPicker";
import { SvgIcon, Tab, Tabs, Typography } from "@mui/material";
import { Emoji } from "emoji-mart";
import { Box } from "@mui/system";
import { IconData, IconFontSize } from "./types";
import * as MIcon from "@mui/icons-material";
import { IconType } from "../../constant";

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
        <RenderIcon icon={selectedIcon} fontSize="small" />
        <RenderIcon icon={selectedIcon} fontSize="medium" />
        <RenderIcon icon={selectedIcon} fontSize="large" />
      </Box>
    </Box>
  );
};

export default IconPicker;

export const RenderIcon = (props: {
  icon: IconData;
  fontSize?: IconFontSize;
  className?: string;
}) => {
  if (props.icon === null || props.icon === undefined) return null;

  switch (props.icon.iconType) {
    case IconType.EMOJI:
      const sizeMap: { [key: string]: number } = {
        large: 27,
        medium: 18.5,
        small: 13,
      };
      return (
        <span className={props.className}>
          <Emoji
            emoji={props.icon.iconId}
            size={sizeMap[props.fontSize ?? "medium"]}
            native={true}
          />
        </span>
      );
    case IconType.MATERIAL_ICON:
      return (
        <SvgIcon
          component={materialIcons[props.icon.iconId]}
          fontSize={props.fontSize}
          className={props.className}
        />
      );
    default:
      break;
  }

  return null;
};
