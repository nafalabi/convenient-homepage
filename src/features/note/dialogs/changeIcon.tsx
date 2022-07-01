import {
  Button,
  DialogActions,
  DialogContent,
  // DialogContentText,
  DialogTitle,
} from "@mui/material";
import React, { useState } from "react";
import NoteModel from "app/db/model/Note";
import IconPicker from "components/IconPicker";
import { IconData } from "components/IconPicker/types";
import { IconType } from "app/constant";

interface Props {
  action: (icon: IconData) => void;
  handleClose: () => void;
  noteDetails: NoteModel | null | undefined;
}

const DialogChangeIcon = ({ action, handleClose, noteDetails }: Props) => {
  const [selectedIcon, setIcon] = useState<IconData>({
    iconId: noteDetails?.iconId ?? "Subject",
    iconType: noteDetails?.iconType ?? IconType.MATERIAL_ICON,
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        action(selectedIcon);
        handleClose();
      }}
    >
      <DialogTitle>Change Note Icon</DialogTitle>
      <DialogContent>
        <IconPicker selectedIcon={selectedIcon} onChangeIcon={setIcon} />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" type="submit">
          Change
        </Button>
      </DialogActions>
    </form>
  );
};

export default DialogChangeIcon;
