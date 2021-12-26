import { TextField } from "@mui/material";
import React from "react";
import InlineFormControl from "components/InlineFormControl";
import { FormikBackgroundSettings } from "../types";

const Bing = ({ formik }: { formik: FormikBackgroundSettings }) => {
  return (
    <InlineFormControl label="Image Index">
      <TextField
        name="bing_img_index"
        value={formik.values.bing_img_index}
        onChange={formik.handleChange}
        fullWidth
        type="number"
        required
      />
    </InlineFormControl>
  );
};

export default Bing;
