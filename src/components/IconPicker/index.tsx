import React, { useState } from "react";
import "emoji-mart/css/emoji-mart.css";
import MaterialIconPicker from "./MaterialIconPicker";
import EmojiPicker from "./EmojiPicker";
import { Tab, Tabs, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { IconData } from "./types";
import * as MIcon from "@mui/icons-material";
import { IconType } from "constant";
import IconRenderer from "components/IconRenderer";

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
        <IconRenderer
          iconType={selectedIcon?.iconType}
          iconId={selectedIcon?.iconId}
          fontSize="small"
        />
        <IconRenderer
          iconType={selectedIcon?.iconType}
          iconId={selectedIcon?.iconId}
          fontSize="medium"
        />
        <IconRenderer
          iconType={selectedIcon?.iconType}
          iconId={selectedIcon?.iconId}
          fontSize="large"
        />
      </Box>
    </Box>
  );
};

export default IconPicker;
