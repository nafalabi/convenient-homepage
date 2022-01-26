import React from "react";
import { Box, Divider, Typography } from "@mui/material";
import FormValues from "./FormValues";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../slice";
import { useSnackbar } from "notistack";
import { FormikProvider, useFormik } from "formik";
import { IGeneralSettings } from "app/storage/app-data/generalSettings";

export interface GeneralSettingsFormValues extends IGeneralSettings {
  darkMode: boolean;
}

const General = () => {
  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();
  const settingValues = useSelector(({ settings }) => settings.generalSettings);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: settingValues,
    onSubmit: async (values) => {
      dispatch(actions.storeGeneralSettings(values));
      enqueueSnackbar("General Settings has been saved", {
        variant: "success",
      });
    },
  });

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
