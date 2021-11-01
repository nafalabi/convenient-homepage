import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import InlineFormControl from "../../../../components/InlineFormControl";
import localData from "../../../../app/storage/local-data";
import { ExpandMore } from "@mui/icons-material";
import { useSnackbar } from "notistack";

const UserDetails = () => {
  const { enqueueSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: localData.generalSettings(),
    onSubmit: (values) => {
      localData.generalSettings(values);
      enqueueSnackbar("User Details has been saved", { variant: "success" });
    },
  });

  return (
    <Accordion defaultExpanded={true}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Box flexBasis="10rem" flexShrink={0}>
          <Typography>User Detail</Typography>
        </Box>
        <Box color="text.secondary">
          <Typography variant="caption">
            This is your detail to be shown on the homepage
          </Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
          <Box flex={1} display="flex" flexDirection="column">
            <InlineFormControl label=" Name">
              <TextField
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                fullWidth
                required
              />
            </InlineFormControl>

            <Box alignSelf="flex-end" mt={1} display="flex" alignItems="center">
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

export default UserDetails;
