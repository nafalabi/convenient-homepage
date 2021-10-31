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
import { ExpandMore } from "@mui/icons-material";
import React, { useState } from "react";
import { useFormik } from "formik";
import InlineFormControl from "../../../../components/InlineFormControl";
import {
  BACKGROUND_PROVIDER_BING,
  BACKGROUND_PROVIDER_PIXABAY,
  BACKGROUND_PROVIDER_UNSPLASH,
} from "../../../../constant";
import localData from "../../../../app/storage/localData";
import Unsplash from "./Providers/Unsplash";
import Pixabay from "./Providers/Pixabay";
import Bing from "./Providers/Bing";
import { useDialog } from "./hooks/useDialog";
import { DIALOG_TESTPROVIDER } from "./dialogs/TestImageProvider";
import { useSnackbar } from "notistack";

const ImageProvider = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { openDialog } = useDialog();
  const [isSaved, setSaved] = useState(false);

  const formik = useFormik({
    initialValues: localData.backgroundProvider(),
    onSubmit: (values) => {
      setSaved(false);
      localData.backgroundProvider(values);
      setTimeout(() => setSaved(true), 200);
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
                <MenuItem value={BACKGROUND_PROVIDER_UNSPLASH}>
                  Unsplash
                </MenuItem>
                <MenuItem value={BACKGROUND_PROVIDER_PIXABAY}>Pixabay</MenuItem>
                <MenuItem value={BACKGROUND_PROVIDER_BING}>Bing</MenuItem>
              </Select>
            </InlineFormControl>

            {formik.values.provider === BACKGROUND_PROVIDER_UNSPLASH && (
              <Unsplash formik={formik} />
            )}
            {formik.values.provider === BACKGROUND_PROVIDER_PIXABAY && (
              <Pixabay formik={formik} />
            )}
            {formik.values.provider === BACKGROUND_PROVIDER_BING && (
              <Bing formik={formik} />
            )}

            <InlineFormControl label="Image refresh interval">
              <TextField
                name="refresh_interval"
                value={formik.values.refresh_interval}
                onChange={formik.handleChange}
                fullWidth
                type="number"
              />
            </InlineFormControl>

            <Box alignSelf="flex-end" mt={1} display="flex" alignItems="center">
              {isSaved && (
                <Box color="text.secondary" mr={2}>
                  <Typography variant="body1">Changes saved</Typography>
                </Box>
              )}
              <Box mr={2}>
                <Button
                  variant="contained"
                  onClick={() => openDialog(DIALOG_TESTPROVIDER, formik.values)}>
                  Test
                </Button>
              </Box>
              <Button variant="contained" color="primary" type="submit">
                Save
              </Button>
            </Box>
          </Box>
        </form>
      </AccordionDetails>
    </Accordion>
  );
};

export default ImageProvider;
