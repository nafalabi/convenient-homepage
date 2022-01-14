import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Box } from "@mui/system";
import { IBackgroundSettings } from "app/storage/app-data/backgroundSettings";
import getImgProviderName from "app/utils/getImgProviderName";
import { ImageProvider } from "constant";
import { useFormikContext } from "formik";
import React, { FormEvent, useState } from "react";
import { useDialog } from "../hooks/useDialog";
import Pixabay from "../Providers/Pixabay";
import Unsplash from "../Providers/Unsplash";
import { Dialogs } from "./DialogController";

export const useEditProviderDialog = () => {
  const values = useDialog<
    Dialogs,
    IBackgroundSettings & { providerId: ImageProvider }
  >();
  return {
    ...values,
    openDialog: (providerId: ImageProvider, settings: IBackgroundSettings) =>
      values.openDialog(Dialogs.EDIT_PROVIDER, { ...settings, providerId }),
  };
};

const EditProviderParam = () => {
  const formik = useFormikContext<IBackgroundSettings>();
  const [originalValues] = useState(formik.values);

  const { args, closeDialog } = useEditProviderDialog();
  const providerId = args?.providerId;

  const providerName = getImgProviderName(providerId);

  const handleClose = () => {
    formik.setValues(originalValues);
    closeDialog();
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    formik.handleSubmit(e);
    closeDialog();
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <DialogTitle>Edit {providerName} Parameters</DialogTitle>
      <DialogContent>
        <DialogContentText></DialogContentText>
        {providerId === ImageProvider.UNSPLASH && <Unsplash />}
        {providerId === ImageProvider.PIXABAY && <Pixabay />}
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="primary" type="submit">
          Save
        </Button>
        <Button variant="outlined" onClick={handleClose}>
          Close
        </Button>
      </DialogActions>
    </Box>
  );
};

export default EditProviderParam;
