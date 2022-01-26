import { Save } from "@mui/icons-material";
import { Button, Switch } from "@mui/material";
import { Box } from "@mui/system";
import { INoteSettings } from "app/storage/app-data/noteSettings";
import InlineFormControl from "components/InlineFormControl";
import SimpleAccordion from "components/SimpleAccordion";
import { FormikProps } from "formik";
import React from "react";

interface Props {
  formik: FormikProps<INoteSettings>;
}

const General = ({ formik }: Props) => {
  return (
    <SimpleAccordion title="Note Config">
      <Box
        flex={1}
        display="flex"
        flexDirection="column"
        component="form"
        onSubmit={formik.handleSubmit}
      >
        <InlineFormControl label="Editable">
          <Switch
            name="editable"
            checked={formik.values.editable}
            onChange={formik.handleChange}
          />
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
  );
};

export default General;
