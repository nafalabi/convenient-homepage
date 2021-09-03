import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDialog } from "../hooks/useDialog";
import ImageAPI from "../../../../../API/ImageAPI/index";
import { Skeleton } from "@material-ui/lab";
import { useSnackbar } from "notistack";

export const DIALOG_TESTPROVIDER = 0;

const DialogTestImageProvider = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { closeDialog } = useDialog();
  const [imageData, setImageData] = useState(null);
  const [refreshReference, setRefreshReference] = useState(0);

  const refreshImage = () => {
    setImageData(null);
    setRefreshReference(Math.random);
  };

  const setAsBackground = async () => {
    if (!imageData) {
      enqueueSnackbar("The image is not loaded yet", { variant: "error" });
      return;
    }
    await ImageAPI.storeAndSaveAsActive(imageData);
    closeDialog();
  };

  useEffect(() => {
    (async () => {
      const imageBase64 = await ImageAPI.getNewBackground();
      if (imageBase64 !== "") setImageData(imageBase64);
    })();
  }, [refreshReference]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <DialogTitle>Test Result</DialogTitle>
      <DialogContent>
        <Box clone display="inline-flex">
          <DialogContentText></DialogContentText>
        </Box>
        <Box
          style={{
            width: "100%",
            minWidth: "910px",
            height: "auto",
            objectFit: "cover",
            aspectRatio: "16/9",
            transform: "scale(1)",
          }}
          clone
        >
          {imageData !== null ? (
            <img src={`data:image/png;base64,${imageData}`} alt="test-result" />
          ) : (
            <Skeleton />
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={refreshImage}>
          Refresh
        </Button>
        <Button variant="outlined" color="primary" onClick={setAsBackground}>
          Set as Background
        </Button>
        <Button variant="outlined" onClick={closeDialog}>
          Close
        </Button>
      </DialogActions>
    </form>
  );
};

export default DialogTestImageProvider;
