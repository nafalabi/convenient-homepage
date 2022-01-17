import React, { useEffect } from "react";
import { Box, Divider, Typography } from "@mui/material";
import FormValues from "./FormValues";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../slice";
import { useSnackbar } from "notistack";
import { FormikProvider, useFormik } from "formik";
import appData from "app/storage/app-data";
import { IGeneralSettings } from "app/storage/app-data/generalSettings";
import LocalData from "app/storage/local-data";

export interface GeneralSettingsFormValues extends IGeneralSettings {
  darkMode: boolean;
}

const General = () => {
  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();
  const settingValues = useSelector(({ settings }) => settings.generalSettings);
  const darkMode = useSelector(({ global }) => global.darkMode);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { ...settingValues, darkMode },
    onSubmit: async (values) => {
      await appData.generalSettings(values);
      LocalData.darkMode(values.darkMode);
      enqueueSnackbar("General Settings has been saved", {
        variant: "success",
      });
    },
  });

  useEffect(() => {
    dispatch(actions.fetchGeneralSettings());
  }, [dispatch]);

  return (
    <Box>
      <FormikProvider value={formik}>
        <Typography variant="h5">General Settings</Typography>
        <Box mt={1} mb={2}>
          <Divider />
        </Box>
        <FormValues />
      </FormikProvider>
    </Box>
  );
};

export default General;
