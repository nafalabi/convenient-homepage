import { Save } from "@mui/icons-material";
import { Button, MenuItem, Select, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { IBackgroundSettings } from "app/storage/app-data/backgroundSettings";
import InlineFormControl from "components/InlineFormControl";
import SimpleAccordion from "components/SimpleAccordion";
import { useFormikContext } from "formik";
import React from "react";

const Lifecycle = () => {
  const formik = useFormikContext<IBackgroundSettings>();

  return (
    <>
      <SimpleAccordion title="Lifecycle">
        <Box
          flex={1}
          display="flex"
          flexDirection="column"
          component="form"
          onSubmit={formik.handleSubmit}
        >
          <InlineFormControl
            label="Library Refresh"
            helper="For every cycle of this period, the background library will be refreshed"
          >
            <>
              <TextField
                name="refresh_list_interval"
                value={formik.values.refresh_list_interval}
                onChange={formik.handleChange}
                type="number"
                sx={{ width: 80 }}
                size="small"
              />
              <Box sx={{ width: 10 }} />
              <Select
                name="refresh_list_interval_unit"
                value={formik.values.refresh_list_interval_unit}
                onChange={formik.handleChange}
                sx={{ width: 110 }}
                size="small"
              >
                <MenuItem value="weeks">Weeks</MenuItem>
                <MenuItem value="days">Days</MenuItem>
                <MenuItem value="hours">Hours</MenuItem>
              </Select>
            </>
          </InlineFormControl>

          <InlineFormControl
            label="Background Rotate"
            helper="For every cycle of this period, the background image will change"
          >
            <>
              <TextField
                name="cycle_interval"
                value={formik.values.cycle_interval}
                onChange={formik.handleChange}
                type="number"
                sx={{ width: 80 }}
                size="small"
              />
              <Box sx={{ width: 10 }} />
              <Select
                name="cycle_interval_unit"
                value={formik.values.cycle_interval_unit}
                onChange={formik.handleChange}
                sx={{ width: 110 }}
                size="small"
              >
                <MenuItem value="days">Days</MenuItem>
                <MenuItem value="hours">Hours</MenuItem>
                <MenuItem value="minutes">Minutes</MenuItem>
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
      </SimpleAccordion>
    </>
  );
};

export default Lifecycle;
