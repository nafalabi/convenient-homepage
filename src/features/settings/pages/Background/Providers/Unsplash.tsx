import { TextField } from "@mui/material";
import React from "react";
import InlineFormControl from "../../../../../components/InlineFormControl";
import { FormikBackgroundSettings } from "../types";

const Unsplash = ({ formik }: { formik: FormikBackgroundSettings }) => {
  return (
    <>
      <InlineFormControl label="Keyword">
        <TextField
          name="unsplash_keyword"
          value={formik.values.unsplash_keyword}
          onChange={formik.handleChange}
          fullWidth
        />
      </InlineFormControl>
      <InlineFormControl label="Dimension">
        <TextField
          name="unsplash_dimension"
          value={formik.values.unsplash_dimension}
          onChange={formik.handleChange}
          fullWidth
        />
      </InlineFormControl>
    </>
  );
};

export default Unsplash;
