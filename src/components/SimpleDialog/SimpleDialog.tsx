import React from "react";
import {
  Button,
  ButtonProps,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
} from "@mui/material";

interface SimpleDialogAction extends ButtonProps {
  label: string;
}

interface SimpleDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content?: React.ReactNode;
  actions?: SimpleDialogAction[];
  dialogProps?: Omit<DialogProps, "open" | "onClose">;
}

const SimpleDialog = ({
  isOpen,
  onClose,
  title,
  content,
  actions,
  dialogProps,
}: SimpleDialogProps) => {
  return (
    <Dialog open={isOpen} onClose={onClose} {...dialogProps}>
      <DialogTitle>{title}</DialogTitle>
      {content && <DialogContent>{content} </DialogContent>}
      {actions && (
        <DialogActions>
          {actions.map(({ label, ...action }) => (
            <Button key={label} children={label} {...action} />
          ))}
        </DialogActions>
      )}
    </Dialog>
  );
};

export default SimpleDialog;
