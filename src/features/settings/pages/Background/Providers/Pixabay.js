import { Box, Checkbox, TextField } from "@mui/material";
import React from "react";
import InlineFormControl from "../../../../../components/InlineFormControl";

const Pixabay = ({ formik }) => {
  return (
    <>
      <InlineFormControl label="API Key">
        <TextField
          name="pixabay_apikey"
          value={formik.values.pixabay_apikey}
          onChange={formik.handleChange}
          fullWidth
          required
        />
      </InlineFormControl>
      <InlineFormControl label="Search Query">
        <TextField
          name="pixabay_q"
          value={formik.values.pixabay_q}
          onChange={formik.handleChange}
          fullWidth
          required
        />
      </InlineFormControl>
      <InlineFormControl label="Category">
        <TextField
          name="pixabay_category"
          value={formik.values.pixabay_category}
          onChange={formik.handleChange}
          fullWidth
          required
        />
      </InlineFormControl>
      <InlineFormControl label="Image Type">
        <TextField
          name="pixabay_image_type"
          value={formik.values.pixabay_image_type}
          onChange={formik.handleChange}
          fullWidth
          required
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
        />
      </InlineFormControl>
    </>
  );
};

export default Pixabay;
