import { Box, Divider, Typography } from "@mui/material";
import React from "react";
import DialogController from "./dialogs/DialogController";
import { DialogProvider } from "./hooks/useDialog";
import Library from "./Library";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { actions } from "../../slice";
import { FormikProvider, useFormik } from "formik";
import Lifecycle from "./Lifecycle";
import ImageProviderSettings from "./Provider";

const Background = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const settingValues = useSelector(
    ({ settings }) => settings.backgroundSettings
  );

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: settingValues,
    onSubmit: async (values) => {
      dispatch(actions.storeBackgroundSettings(values));
      enqueueSnackbar("Background Settings has been saved", {
        variant: "success",
      });
    },
  });

  return (
    <DialogProvider>
      <FormikProvider value={formik}>
        <Box>
          <Typography variant="h5">Background Settings</Typography>
          <Box mt={1} mb={2}>
            <Divider />
          </Box>

          <Library />
          <Lifecycle />
          <ImageProviderSettings />

          <DialogController />
        </Box>
      </FormikProvider>
    </DialogProvider>
  );
};

export default Background;
