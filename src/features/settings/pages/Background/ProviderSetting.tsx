import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { ExpandMore, FactCheck, Save } from "@mui/icons-material";
import React, { useState } from "react";
import { useFormik } from "formik";
import InlineFormControl from "../../../../components/InlineFormControl";
import { ImageProvider } from "../../../../constant";
import Unsplash from "./Providers/Unsplash";
import Pixabay from "./Providers/Pixabay";
import Bing from "./Providers/Bing";
import { useDialog } from "./hooks/useDialog";
import { DIALOG_TESTPROVIDER } from "./dialogs/TestImageProvider";
import { useSnackbar } from "notistack";
import { useSelector } from "react-redux";
import appData from "../../../../app/storage/app-data";

const ProviderSetting = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { openDialog } = useDialog();
  const [isSaved, setSaved] = useState(false);
  const settingValues = useSelector(
    ({ settings }) => settings.backgroundSettings
  );

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: settingValues,
    onSubmit: async (values) => {
      setSaved(false);
      await appData.backgroundSettings(values);
      setSaved(true);
      enqueueSnackbar("Image Provider Settings has been saved", {
        variant: "success",
      });
    },
  });

  return (
    <Accordion defaultExpanded={true}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Box flexBasis="10rem" flexShrink={0}>
          <Typography>Image Provider</Typography>
        </Box>
        <Box color="text.secondary">
          <Typography variant="caption">
            Set image provider & refresh interval
          </Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
          <Box flex={1} display="flex" flexDirection="column">
            <InlineFormControl label="Image provider">
              <Select
                name="provider"
                value={formik.values.provider}
                onChange={formik.handleChange}
                fullWidth
              >
                <MenuItem value={ImageProvider.UNSPLASH}>Unsplash</MenuItem>
                <MenuItem value={ImageProvider.PIXABAY}>Pixabay</MenuItem>
                <MenuItem value={ImageProvider.BING}>Bing</MenuItem>
              </Select>
            </InlineFormControl>

            {formik.values.provider === ImageProvider.UNSPLASH && (
              <Unsplash formik={formik} />
            )}
            {formik.values.provider === ImageProvider.PIXABAY && (
              <Pixabay formik={formik} />
            )}
            {formik.values.provider === ImageProvider.BING && (
              <Bing formik={formik} />
            )}

            <InlineFormControl label="Image refresh interval">
              <>
                <TextField
                  name="refresh_interval"
                  value={formik.values.refresh_interval}
                  onChange={formik.handleChange}
                  type="number"
                  sx={{ width: 100 }}
                />
                <Box sx={{ width: 10 }} />
                <Select
                  name="refresh_interval_unit"
                  value={formik.values.refresh_interval_unit}
                  onChange={formik.handleChange}
                  sx={{ width: 150 }}
                >
                  <MenuItem value="days">Days</MenuItem>
                  <MenuItem value="hours">Hours</MenuItem>
                  <MenuItem value="minutes">Minutes</MenuItem>
                </Select>
              </>
            </InlineFormControl>

            <Box alignSelf="flex-end" mt={1} display="flex" alignItems="center">
              {isSaved && (
                <Box color="text.secondary" mr={2}>
                  <Typography variant="body1">Changes saved</Typography>
                </Box>
              )}
              <Box mr={2}>
                <Button
                  onClick={() => openDialog(DIALOG_TESTPROVIDER, formik.values)}
                  startIcon={<FactCheck />}
                >
                  Test
                </Button>
              </Box>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                startIcon={<Save />}
              >
                Save
              </Button>
            </Box>
          </Box>
        </form>
      </AccordionDetails>
    </Accordion>
  );
};

export default ProviderSetting;
