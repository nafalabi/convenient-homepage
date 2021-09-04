import { TextField } from "@material-ui/core";
import React from "react";
import InlineFormControl from "../../../../../components/InlineFormControl";

const Bing = ({ formik }) => {
  return (
    <InlineFormControl label="Image Index">
      <TextField
        name="bing_img_index"
        value={formik.values.bing_img_index}
        onChange={formik.handleChange}
        fullWidth
        type="number"
        max="7"
        min="0"
        required
      />
    </InlineFormControl>
  );
};

export default Bing;
