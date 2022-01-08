import React from "react";
import { useFormikContext } from "formik";
import { IBackgroundSettings } from "app/storage/app-data/backgroundSettings";
import InlineFormControl from "components/InlineFormControl";
import { MenuItem, Select, TextField } from "@mui/material";

const Unsplash = () => {
  const formik = useFormikContext<IBackgroundSettings>();

  return (
    <>
      <InlineFormControl label="Keyword">
        <TextField
          name="unsplash_query"
          value={formik.values.unsplash_query}
          onChange={formik.handleChange}
          fullWidth
          size="small"
        />
      </InlineFormControl>
      <InlineFormControl label="Orientation">
        <Select
          name="unsplash_orientation"
          value={formik.values.unsplash_orientation}
          onChange={formik.handleChange}
          fullWidth
          size="small"
        >
          <MenuItem value="landscape">Landscape</MenuItem>
          <MenuItem value="portrait">Portrait</MenuItem>
          <MenuItem value="squarish">Squarish</MenuItem>
        </Select>
      </InlineFormControl>
      <InlineFormControl label="Select">
        <Select
          name="unsplash_order_by"
          value={formik.values.unsplash_order_by}
          onChange={formik.handleChange}
          fullWidth
          size="small"
        >
          <MenuItem value="relevant">Relevant</MenuItem>
          <MenuItem value="latest">Latest</MenuItem>
        </Select>
      </InlineFormControl>
    </>
  );
};

export default Unsplash;
