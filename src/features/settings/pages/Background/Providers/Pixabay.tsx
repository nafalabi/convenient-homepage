import { Box, Checkbox, TextField } from "@mui/material";
import React from "react";
import InlineFormControl from "components/InlineFormControl";
import { useFormikContext } from "formik";
import { IBackgroundSettings } from "app/storage/app-data/backgroundSettings";

const Pixabay = () => {
  const formik = useFormikContext<IBackgroundSettings>();

  return (
    <>
      <InlineFormControl label="Search Query">
        <TextField
          name="pixabay_q"
          value={formik.values.pixabay_q}
          onChange={formik.handleChange}
          fullWidth
          required
          size="small"
        />
      </InlineFormControl>
      <InlineFormControl label="Category">
        <TextField
          name="pixabay_category"
          value={formik.values.pixabay_category}
          onChange={formik.handleChange}
          fullWidth
          required
          size="small"
        />
      </InlineFormControl>
      <InlineFormControl label="Editors Choice">
        <Box ml="-11px">
          <Checkbox
            name="pixabay_editors_choice"
            checked={formik.values.pixabay_editors_choice}
            onChange={formik.handleChange}
            color="primary"
          />
        </Box>
      </InlineFormControl>
      <InlineFormControl label="Minimum width">
        <TextField
          name="pixabay_min_width"
          value={formik.values.pixabay_min_width}
          onChange={formik.handleChange}
          fullWidth
          type="number"
          required
          size="small"
        />
      </InlineFormControl>
    </>
  );
};

export default Pixabay;
