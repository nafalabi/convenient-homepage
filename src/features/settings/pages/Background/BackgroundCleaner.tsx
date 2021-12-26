import { ExpandMore, Save } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { FormikProps } from "formik";
import React from "react";
import { IBackgroundSettings } from "app/storage/app-data/backgroundSettings";
import InlineFormControl from "components/InlineFormControl";

type props = {
  formik: FormikProps<IBackgroundSettings>;
};

const BackgroundCleaner = ({ formik }: props) => {
  return (
    <>
      <Accordion defaultExpanded={true}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Box flexBasis="10rem" flexShrink={0}>
            <Typography>Background Cleaner</Typography>
          </Box>
          <Box color="text.secondary">
            <Typography variant="caption">
              Set period to clear the old background images
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Box
            flex={1}
            display="flex"
            flexDirection="column"
            component="form"
            onSubmit={formik.handleSubmit}
          >
            <InlineFormControl
              label="Background lifetime"
              helper="Background images that are older than this will be deleted periodically"
            >
              <>
                <TextField
                  name="background_lifetime"
                  value={formik.values.background_lifetime}
                  onChange={formik.handleChange}
                  type="number"
                  sx={{ width: 100 }}
                />
                <Box sx={{ width: 10 }} />
                <Select
                  name="background_lifetime_unit"
                  value={formik.values.background_lifetime_unit}
                  onChange={formik.handleChange}
                  sx={{ width: 150 }}
                >
                  <MenuItem value="weeks">Weeks</MenuItem>
                  <MenuItem value="days">Days</MenuItem>
                  <MenuItem value="hours">Hours</MenuItem>
                </Select>
              </>
            </InlineFormControl>

            <Box alignSelf="flex-end" mt={1} display="flex" alignItems="center">
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
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default BackgroundCleaner;
