import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Checkbox,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { grantAccess } from "app/api/github/github-oauth2";
import { INoteSettings } from "app/storage/app-data/noteSettings";
import InlineFormControl from "components/InlineFormControl";
import { FormikProps } from "formik";
import { useSnackbar } from "notistack";
import React, { useCallback } from "react";

interface Props {
  formik: FormikProps<INoteSettings>;
}

const GistIntegration = ({ formik }: Props) => {
  const { enqueueSnackbar } = useSnackbar();
  const { values, setValues, handleChange, handleSubmit, submitForm } = formik;

  const grant = useCallback(async () => {
    try {
      const access = await grantAccess();
      const token = access.access_token;
      setValues({
        ...values,
        githubAccessToken: token,
        integrateGithubGist: true,
      });
      submitForm();
      enqueueSnackbar("Success granting access", { variant: "success" });
    } catch (e) {
      enqueueSnackbar("Failed to grant access", { variant: "error" });
    }
  }, [setValues, submitForm, enqueueSnackbar, values]);

  return (
    <Accordion defaultExpanded={true}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Box flexBasis="10rem" flexShrink={0}>
          <Typography>Gist Integration</Typography>
        </Box>
        <Box color="text.secondary">
          <Typography variant="caption">Manage Github Gist as Note</Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Box
          flex={1}
          display="flex"
          flexDirection="column"
          component="form"
          onSubmit={handleSubmit}
        >
          <InlineFormControl label="Grant Access">
            {values.githubAccessToken ? (
              <Button variant="contained" disabled>
                Access Granted
              </Button>
            ) : (
              <Button variant="contained" onClick={grant}>
                Grant
              </Button>
            )}
          </InlineFormControl>
          <InlineFormControl label="Enable Integration">
            <Checkbox
              name="integrateGithubGist"
              checked={values.integrateGithubGist}
              onChange={handleChange}
              disabled={values.githubAccessToken === ""}
            />
          </InlineFormControl>
          <Box alignSelf="flex-end" mt={1} display="flex" alignItems="center">
            <Button variant="contained" color="primary" type="submit">
              Save
            </Button>
          </Box>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default GistIntegration;
