import { Box, Button, Paper, Switch, TextField } from "@mui/material";
import { useFormikContext } from "formik";
import React from "react";
import InlineFormControl from "components/InlineFormControl";
import { IGeneralSettings } from "app/storage/app-data/generalSettings";
import { Save } from "@mui/icons-material";
import { GeneralSettingsFormValues } from ".";

const FormValues = () => {
  const formik = useFormikContext<GeneralSettingsFormValues>();

  return (
    <Paper
      sx={{ width: "100%", p: 2 }}
      component="form"
      onSubmit={formik.handleSubmit}
    >
      <Box flex={1} display="flex" flexDirection="column">
        <InlineFormControl label="User Name" inputFullWidth>
          <TextField
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            fullWidth
            required
            size="small"
          />
        </InlineFormControl>
        <InlineFormControl label="Dark Mode">
          <Switch
            name="darkMode"
            checked={formik.values.darkMode}
            onChange={formik.handleChange}
          />
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
    </Paper>
  );
};

export default FormValues;
