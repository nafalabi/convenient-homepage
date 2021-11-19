import { Picker } from "emoji-mart";
import React, { useState } from "react";

const EmojiPicker = (props: { onClickIcon: (iconId: string) => void }) => {
  const [pickedIcon, pickIcon] = useState<string>("rocket");

  return (
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
    />
  );
};

export default EmojiPicker;
