import { Button, Typography, Paper, Divider, TextField } from "@mui/material";
import { Box } from "@mui/system";
import dexieDB from "app/db";
import React, { useState } from "react";
import WizardImportDB from "./WizardImportDB";
import InlineFormControl from "components/InlineFormControl";
import { Download, Upload } from "@mui/icons-material";
import SimpleDialog from "components/SimpleDialog";
import { useSnackbar } from "notistack";

const DatabaseSetting = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [isImportWizardOpen, setOpenImportWizard] = useState(false);
  const [isExportDialogOpen, setOpenExportDialog] = useState(false);

  const handleCloseExportDialog = () => {
    setOpenExportDialog(false);
  };

  const handleExportDatabase = async () => {
    enqueueSnackbar("Exporting Database...", { variant: "info" });
    handleCloseExportDialog();
    await dexieDB.export();
  };

  return (
    <Box>
      <Typography variant="h5">Database Information</Typography>
      <Box mt={1} mb={2}>
        <Divider />
      </Box>

      <Paper sx={{ width: "100%", p: 2 }}>
        <Box flex={1} display="flex" flexDirection="column"></Box>
        <InlineFormControl label="Database Name">
          <TextField value={dexieDB.name} disabled fullWidth size="small" />
        </InlineFormControl>
        <InlineFormControl label="Current version">
          <TextField value={dexieDB.verno} disabled fullWidth size="small" />
        </InlineFormControl>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 2,
            justifyContent: "flex-end",
            mt: 3,
          }}
        >
          <Button
            onClick={() => setOpenImportWizard(true)}
            startIcon={<Upload />}
          >
            Import DB
          </Button>
          <Button
            onClick={() => setOpenExportDialog(true)}
            startIcon={<Download />}
          >
            Export DB
          </Button>
        </Box>
      </Paper>

      <WizardImportDB
        isOpen={isImportWizardOpen}
        onClose={() => setOpenImportWizard(false)}
      />
      <SimpleDialog
        isOpen={isExportDialogOpen}
        title="You sure you want to export the database?"
        onClose={handleCloseExportDialog}
        actions={[
          { label: "OK", autoFocus: true, onClick: handleExportDatabase },
          { label: "Cancel", onClick: handleCloseExportDialog },
        ]}
      />
    </Box>
  );
};

export default DatabaseSetting;
