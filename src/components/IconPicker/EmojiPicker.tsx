import { Picker } from "emoji-mart";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";

const EmojiPicker = (props: { onClickIcon: (iconId: string) => void }) => {
  const [pickedIcon, pickIcon] = useState<string>("rocket");
  const darkMode = useSelector(
    ({ settings }) => settings.generalSettings.darkMode
  );

  return (
    <Box mt={1}>
      <Picker
        emoji={pickedIcon}
        onSelect={(icon) => {
          pickIcon(icon.id ?? "");
          props.onClickIcon(icon.id ?? "");
        }}
        showPreview={false}
        showSkinTones={false}
        emojiTooltip={true}
        native={true}
        theme={darkMode ? "dark" : "light"}
      />
    </Box>
  );
};

export default EmojiPicker;
