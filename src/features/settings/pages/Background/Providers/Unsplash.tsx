import React from "react";
import { FormikProps, useFormikContext } from "formik";
import { IBackgroundSettings } from "app/storage/app-data/backgroundSettings";
import InlineFormControl from "components/InlineFormControl";
import {
  FormControlLabel,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import { UnsplashFetchMode } from "app/api/image-api/Unsplash";

const Unsplash = () => {
  const formik = useFormikContext<IBackgroundSettings>();

  return (
    <>
      <FormLabel>Fetch Mode</FormLabel>
      <RadioGroup
        name="unsplash_fetch_mode"
        onChange={(e, val) => {
          const intVal = parseInt(val);
          formik.setFieldValue("unsplash_fetch_mode", intVal);
        }}
        value={formik.values.unsplash_fetch_mode}
        row
      >
        <FormControlLabel
          value={UnsplashFetchMode.RANDOM}
          control={<Radio />}
          label="Random"
        />
        <FormControlLabel
          value={UnsplashFetchMode.SEARCH}
          control={<Radio />}
          label="Search"
        />
      </RadioGroup>
      {formik.values.unsplash_fetch_mode === UnsplashFetchMode.SEARCH && (
        <UnsplashSearchMode formik={formik} />
      )}
      {formik.values.unsplash_fetch_mode === UnsplashFetchMode.RANDOM && (
        <UnsplashRandomMode formik={formik} />
      )}
    </>
  );
};

export default Unsplash;

const UnsplashSearchMode = ({
  formik,
}: {
  formik: FormikProps<IBackgroundSettings>;
}) => {
  return (
    <>
      <InlineFormControl label="Keyword">
        <TextField
          name="search_unsplash_query"
          value={formik.values.search_unsplash_query}
          onChange={formik.handleChange}
          fullWidth
          size="small"
        />
      </InlineFormControl>
      <InlineFormControl label="Orientation">
        <Select
          name="search_unsplash_orientation"
          value={formik.values.search_unsplash_orientation}
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
          name="search_unsplash_order_by"
          value={formik.values.search_unsplash_order_by}
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

const UnsplashRandomMode = ({
  formik,
}: {
  formik: FormikProps<IBackgroundSettings>;
}) => {
  return (
    <>
      <InlineFormControl label="Topic">
        <TextField
          name="random_unsplash_topics"
          value={formik.values.random_unsplash_topics}
          onChange={formik.handleChange}
          fullWidth
          size="small"
        />
      </InlineFormControl>
      <InlineFormControl label="Keyword">
        <TextField
          name="random_unsplash_query"
          value={formik.values.random_unsplash_query}
          onChange={formik.handleChange}
          fullWidth
          size="small"
        />
      </InlineFormControl>
      <InlineFormControl label="Orientation">
        <Select
          name="random_unsplash_orientation"
          value={formik.values.random_unsplash_orientation}
          onChange={formik.handleChange}
          fullWidth
          size="small"
        >
          <MenuItem value="landscape">Landscape</MenuItem>
          <MenuItem value="portrait">Portrait</MenuItem>
          <MenuItem value="squarish">Squarish</MenuItem>
        </Select>
      </InlineFormControl>
    </>
  );
};
