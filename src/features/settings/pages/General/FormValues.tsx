import { Box, Button, Divider, Paper, Switch, TextField } from "@mui/material";
import { useFormikContext } from "formik";
import React from "react";
import InlineFormControl from "components/InlineFormControl";
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

        <Box mt={1} pb={1}>
          Background Appearance
        </Box>
        <Divider sx={{ mb: 1 }} />

        <Box pl={1}>
          <InlineFormControl label="Clock">
            <Switch
              name="showClock"
              checked={formik.values.showClock}
              onChange={formik.handleChange}
            />
          </InlineFormControl>
          <InlineFormControl label="Time Greeting">
            <Switch
              name="showTimeGreeting"
              checked={formik.values.showTimeGreeting}
              onChange={formik.handleChange}
            />
          </InlineFormControl>
          <InlineFormControl label="Casual Greeting">
            <Switch
              name="showCasualGreeting"
              checked={formik.values.showCasualGreeting}
              onChange={formik.handleChange}
            />
          </InlineFormControl>
          <InlineFormControl label="Search Field">
            <Switch
              name="showSearchField"
              checked={formik.values.showSearchField}
              onChange={formik.handleChange}
            />
          </InlineFormControl>
        </Box>

        <Box alignSelf="flex-end" mt={1} display="flex" alignItems="center">
          <Button
            variant="outlined"
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
