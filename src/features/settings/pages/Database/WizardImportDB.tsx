import dexieDB from "app/db";
import DroppableFileInput from "components/DroppableFileInput";
import SimpleDialog from "components/SimpleDialog";
import React, { useState } from "react";
import mime from "mime-types";
import { useSnackbar } from "notistack";
import { Box } from "@mui/material";
import { FilePresent } from "@mui/icons-material";

export interface WizardImportDBProps {
  isOpen: boolean;
  onClose: () => void;
}

const WizardImportDB = ({ isOpen, onClose }: WizardImportDBProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleImport = async () => {
    if (!selectedFile) return;
    enqueueSnackbar("Importing database...", { variant: "info" });
    onClose();
    await dexieDB.import(selectedFile);
    enqueueSnackbar("Success importing database", { variant: "success" });
    setSelectedFile(null);
  };

  const handleFileChange = (files: FileList | null) => {
    if (!files) return;
    try {
      const file = files.item(0);
      if (file?.type !== (mime.lookup("json") as string))
        throw new Error("Error: expected json file");
      setSelectedFile(file);
    } catch (e) {
      const err = e as Error;
      enqueueSnackbar(err.message, { variant: "error" });
    }
  };

  return (
    <SimpleDialog
      isOpen={isOpen}
      onClose={onClose}
      title="Import Database"
      dialogProps={{ maxWidth: "sm", fullWidth: true }}
      content={
        <>
          <DroppableFileInput
            onFileChange={handleFileChange}
            accept={mime.lookup("json") as string}
          />
          {selectedFile && (
            <Box
              sx={(theme) => ({
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mt: theme.spacing(1),
              })}
            >
              <FilePresent />
              <span>{selectedFile.name}</span>
            </Box>
          )}
        </>
      }
      actions={[
        {
          label: "Import",
          onClick: handleImport,
          disabled: selectedFile === null,
        },
        { label: "Close", onClick: onClose },
      ]}
    />
  );
};

export default WizardImportDB;
