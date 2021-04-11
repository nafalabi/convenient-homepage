import { TextField } from "@material-ui/core";
import React from "react";
import InlineFormControl from "../../../../../components/InlineFormControl";

const Unsplash = ({ formik }) => {
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
