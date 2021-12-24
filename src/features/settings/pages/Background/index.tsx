import { Box, Divider, Typography } from "@mui/material";
import React, { useEffect } from "react";
import DialogController from "./dialogs/DialogController";
import { DialogProvider } from "./hooks/useDialog";
import ProviderSetting from "./ProviderSetting";
import Library from "./Library";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { actions } from "../../slice";
import BackgroundCleaner from "./BackgroundCleaner";
import { useFormik } from "formik";
import appData from "../../../../app/storage/app-data";

const Background = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const settingValues = useSelector(
    ({ settings }) => settings.backgroundSettings
  );

  useEffect(() => {
    dispatch(actions.fetchBackgroundSettings());
  }, [dispatch]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: settingValues,
    onSubmit: async (values) => {
      await appData.backgroundSettings(values);
      enqueueSnackbar("Background Settings has been saved", {
        variant: "success",
      });
    },
  });

  return (
    <DialogProvider>
      <Box>
        <Typography variant="h5">Background Settings</Typography>
        <Box mt={1} mb={2}>
          <Divider />
        </Box>

        <ProviderSetting formik={formik} />
        <BackgroundCleaner formik={formik} />
        <Library />

        <DialogController />
      </Box>
    </DialogProvider>
  );
};

export default Background;
