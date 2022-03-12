import {
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  Paper,
  Box,
  Button,
  TextField,
  Link,
} from "@mui/material";
import { useFormik } from "formik";
import QuickLink from "app/db/schema/QuickLink";
import IconRenderer from "components/IconRenderer";
import InlineFormControl from "components/InlineFormControl";
import { IconType, QuickLinkTypes } from "constant";
import React, { SyntheticEvent, useRef, useState } from "react";
import AppController from "app/controller";
import handleQuickLinkActions from "./handleActions";

export enum ActionDialogs {
  REMOVE = 0,
  EDIT = 1,
}

export interface ActionMenuProps {
  className: string;
  data: QuickLink;
}

export interface ActionMenuDialogProps {
  isOpen: boolean;
  data: QuickLink;
  handleClose: (e: SyntheticEvent) => void;
}

const ActionMenu = ({ className, data }: ActionMenuProps) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [isMenuOpen, setOpenMenu] = useState(false);
  const [openedDialog, setDialogOpen] = useState<ActionDialogs | null>(null);

  const handleOpenMenu = (e: SyntheticEvent) => {
    e.stopPropagation();
    setOpenMenu(true);
  };

  const handleCloseMenu = (e: SyntheticEvent) => {
    e.stopPropagation();
    setOpenMenu(false);
  };

  const handleOpenEditDialog = (e: SyntheticEvent) => {
    e.stopPropagation();
    setDialogOpen(ActionDialogs.EDIT);
    handleCloseMenu(e);
  };

  const handleOpenRemoveDialog = (e: SyntheticEvent) => {
    e.stopPropagation();
    setDialogOpen(ActionDialogs.REMOVE);
    handleCloseMenu(e);
  };

  const handleCloseDialog = (e: SyntheticEvent) => {
    e.stopPropagation();
    setDialogOpen(null);
  };

  return (
    <>
      <IconButton
        ref={buttonRef}
        sx={{ position: "absolute", top: 0, right: -1 }}
        size="small"
        onClick={handleOpenMenu}
        className={className}
      >
        <IconRenderer
          iconId="more_vert"
          iconType={IconType.MATERIAL_ICON}
          fontSize="small"
        />
      </IconButton>

      <Menu
        open={isMenuOpen}
        onClose={handleCloseMenu}
        anchorEl={buttonRef.current}
        sx={{
          "& li": {
            fontSize: "12px",
          },
        }}
      >
        <MenuItem onClick={handleOpenEditDialog}>Edit</MenuItem>
        <MenuItem onClick={handleOpenRemoveDialog}>Remove</MenuItem>
      </Menu>

      <DialogRemoveQL
        isOpen={openedDialog === ActionDialogs.REMOVE}
        data={data}
        handleClose={handleCloseDialog}
      />
      <DialogEditQL
        isOpen={openedDialog === ActionDialogs.EDIT}
        data={data}
        handleClose={handleCloseDialog}
      />
    </>
  );
};

export default ActionMenu;

const DialogRemoveQL = ({
  isOpen,
  data,
  handleClose,
}: ActionMenuDialogProps) => {
  const stopPropagate = (e: SyntheticEvent) => {
    e.stopPropagation();
  };

  const handleRemoveQL = async (e: SyntheticEvent) => {
    await AppController.quicklink.removeQuickLink(data.id);
    handleClose(e);
  };

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <Paper onClick={stopPropagate} sx={{ p: 2 }}>
        <Box sx={{ textAlign: "center" }}>
          Are you sure want to remove this link?
        </Box>
        <Box
          sx={(theme) => ({
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: `${theme.spacing(2)} 0`,
            opacity: 0.7,
            width: 300,
          })}
        >
          <IconRenderer iconId={data.iconId} iconType={data.iconType} />
          <Box
            component="span"
            sx={{
              ml: 1,
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            {data.title}
          </Box>
        </Box>
        <Box
          sx={(theme) => ({
            display: "flex",
            justifyContent: "space-evenly",
            gap: theme.spacing(1),
          })}
        >
          <Button variant="contained" color="error" onClick={handleRemoveQL}>
            Remove
          </Button>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
        </Box>
      </Paper>
    </Dialog>
  );
};

const DialogEditQL = ({ isOpen, data, handleClose }: ActionMenuDialogProps) => {
  const stopPropagate = (e: SyntheticEvent) => {
    e.stopPropagation();
  };

  const handleClickAction = (e: SyntheticEvent) => {
    handleQuickLinkActions(data.id as number);
    handleClose(e);
  };

  const formik = useFormik({
    initialValues: {
      title: data.title,
      url: data.url,
    },
    onSubmit: ({ title, url }) => {
      AppController.quicklink.updateQuickLink(data.id as number, {
        title: title ?? "",
        url,
      });
    },
  });

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <Paper
        onClick={stopPropagate}
        sx={{ p: 2 }}
        component="form"
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          formik.handleSubmit(e);
          handleClose(e);
        }}
      >
        <Box sx={{ textAlign: "center" }}>Edit Link</Box>
        <Box my={1}>
          <InlineFormControl label="Name" labelWidth="50px">
            <TextField
              size="small"
              name="title"
              onChange={formik.handleChange}
              value={formik.values.title}
            />
          </InlineFormControl>

          {data.type === QuickLinkTypes.MANUAL_LINK && (
            <InlineFormControl label="URL" labelWidth="50px">
              <TextField
                size="small"
                name="url"
                onChange={formik.handleChange}
                value={formik.values.url}
              />
            </InlineFormControl>
          )}

          {data.type !== QuickLinkTypes.MANUAL_LINK && (
            <Box
              sx={(theme) => ({
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: `${theme.spacing(2)} 0`,
                opacity: 0.7,
                width: 300,
                cursor: "pointer",
              })}
              component={Link}
              onClick={handleClickAction}
            >
              <IconRenderer iconId={data.iconId} iconType={data.iconType} />
              <Box
                component="span"
                sx={{
                  ml: 1,
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}
              >
                {data.title}
              </Box>
            </Box>
          )}
        </Box>
        <Box
          sx={(theme) => ({
            display: "flex",
            justifyContent: "space-evenly",
            gap: theme.spacing(1),
          })}
        >
          <Button
            variant="contained"
            color="primary"
            sx={{ width: "70px" }}
            type="submit"
          >
            Save
          </Button>
          <Button
            variant="outlined"
            onClick={handleClose}
            sx={{ width: "70px" }}
          >
            Cancel
          </Button>
        </Box>
      </Paper>
    </Dialog>
  );
};
