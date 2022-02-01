import { Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { actions } from "features/settings/slice";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import General from "./General";
// import GistIntegration from "./GistIntegration";

const NoteSettingsPage = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const noteSettings = useSelector(({ settings }) => settings.noteSettings);

  const formik = useFormik({
    initialValues: noteSettings,
    enableReinitialize: true,
    onSubmit: async (values) => {
      dispatch(actions.storeNoteSettings(values));
      enqueueSnackbar("Note Settings Saved", { variant: "success" });
    },
  });

  return (
    <Box>
      <Typography variant="h5">General Settings</Typography>
      <Box mt={1} mb={2}>
        <Divider />
      </Box>

      <General formik={formik} />
      {/* <GistIntegration formik={formik} /> */}
    </Box>
  );
};

export default NoteSettingsPage;
