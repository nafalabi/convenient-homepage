import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";

interface CreateLinkProps {
  onLinkCreated: (title: string, url: string) => void;
}

const CreateLink = ({ onLinkCreated }: CreateLinkProps) => {
  const formik = useFormik({
    initialValues: {
      title: "",
      url: "",
    },
    onSubmit: (values) => {
      onLinkCreated(values.title, values.url);
    },
  });

  return (
    <Box
      sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
      component="form"
      onSubmit={formik.handleSubmit}
    >
      <Box sx={{ mb: 1 }}>
        <Typography>Title</Typography>
        <TextField
          fullWidth
          size="small"
          placeholder=""
          autoFocus
          name="title"
          onChange={formik.handleChange}
        />
      </Box>

      <Box sx={{ mb: 1 }}>
        <Typography>URL</Typography>
        <TextField
          fullWidth
          size="small"
          placeholder=""
          type="url"
          name="url"
          onChange={formik.handleChange}
        />
      </Box>

      <Button variant="contained" color="primary" fullWidth type="submit">
        Create Link
      </Button>
    </Box>
  );
};

export default CreateLink;
