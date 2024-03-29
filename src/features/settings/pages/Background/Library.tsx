import {
  Box,
  Button,
  Fab,
  ImageList,
  ImageListItem,
  styled,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  Check,
  Delete,
  Download,
  Info,
  Refresh,
  Shuffle,
} from "@mui/icons-material";
import { Pagination } from "@mui/material";
import React, { useState } from "react";
import useSubscribeBackgroundImages from "./hooks/useSubscribeBackgroundImages";
import AppController from "app/controller";
import SimpleAccordion from "components/SimpleAccordion";
import BackgroundImageModel from "app/db/model/BackgroundImage";
import getImgProviderName from "app/utils/getImgProviderName";
import { useSnackbar } from "notistack";
import { useConfirmationDialog } from "./dialogs/ConfirmationDialog";

const Library = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { openDialog } = useConfirmationDialog();
  const [showingImage] = useState(9);
  const [currentPage, setCurrentPage] = useState(0);
  const queryResult = useSubscribeBackgroundImages(showingImage, currentPage);

  const { total, images } = queryResult;
  const totalPage = Math.ceil(total / showingImage);

  const shuffleBackground = async () => {
    enqueueSnackbar("Shuffling Background Image...", { variant: "info" });
    await AppController.backgroundimage.cycleBackground();
    closeSnackbar();
    enqueueSnackbar("Success Shuffling Background Image", {
      variant: "success",
    });
  };

  const refreshImageList = () => {
    openDialog(
      "Refresh Image List",
      "Are you sure about this?\nAll the images currently in library will be removed and replaced by new ones",
      async (confirmed) => {
        if (!confirmed) return;
        enqueueSnackbar("Refreshing Image List...", { variant: "info" });
        await AppController.backgroundimage.refreshBackgroundList();
        enqueueSnackbar("Success Refreshing Image List", {
          variant: "success",
        });
      }
    );
  };

  return (
    <SimpleAccordion
      title="Background Library"
      subtitle="List of Available Images"
    >
      <>
        <Box display="flex" gap={1} justifyContent="flex-start">
          <Tooltip title="Refresh all the images in the Library">
            <Button
              variant="outlined"
              startIcon={<Refresh />}
              onClick={refreshImageList}
            >
              Refresh Image List
            </Button>
          </Tooltip>
          <Tooltip title="Randomly rotate the background">
            <Button
              variant="outlined"
              startIcon={<Shuffle />}
              onClick={shuffleBackground}
            >
              Rotate Background
            </Button>
          </Tooltip>
        </Box>
        <Box width="100%">
          <ImageList cols={3}>
            {images.map((background) => {
              return (
                <BackgroundImagePreview
                  key={background.id}
                  background={background}
                />
              );
            })}
          </ImageList>
          <Box mt={1} width="100%" display="flex">
            <Box margin="auto">
              <Pagination
                count={totalPage}
                page={currentPage + 1}
                onChange={(e, page) => setCurrentPage(page - 1)}
              />
            </Box>
          </Box>
        </Box>
      </>
    </SimpleAccordion>
  );
};

export default Library;

const StyledImageListItem = styled(ImageListItem)(({ theme }) => ({
  position: "relative",
  "& .action": {
    opacity: 0,
    position: "absolute",
    zIndex: 10,
    top: 0,
    bottom: 0,
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
  },
  "& .info": {
    opacity: 0,
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    zIndex: 10,
  },
  "&:hover": {
    "&:after": {
      content: "' '",
      position: "absolute",
      background: "#00000026",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      pointerEvents: "none",
    },
    "& .action, & .info": {
      opacity: 1,
    },
  },
  "&.active": {
    border: `3px solid ${theme.palette.primary.main}`,
  },
  "& img": {
    aspectRatio: "16/9",
    border: `1px solid ${theme.palette.divider}`,
  },
}));

const BackgroundImagePreview = ({
  background,
}: {
  id?: number;
  background: BackgroundImageModel;
}) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const isActive = Boolean(background.active);

  const deleteImage = () => background.delete();

  const setAsBackground = async () => {
    enqueueSnackbar("Changing background image...", { variant: "info" });
    await AppController.backgroundimage.setAsActive(background.id);
    closeSnackbar();
  };

  const downloadImage = () => {
    enqueueSnackbar("Starting download...", { variant: "info" });
    AppController.backgroundimage.downloadImage(background.id);
  };

  return (
    <StyledImageListItem className={isActive ? "active" : ""}>
      <div className="action">
        <Box mt={1} ml={1}>
          <Tooltip title="Delete" PopperProps={{ placement: "right" }}>
            <Fab color="secondary" size="small" onClick={deleteImage}>
              <Delete />
            </Fab>
          </Tooltip>
        </Box>
        <Box mt={1} ml={1}>
          <Tooltip
            title="Set as Background"
            PopperProps={{ placement: "right" }}
          >
            <Fab color="primary" size="small" onClick={setAsBackground}>
              <Check />
            </Fab>
          </Tooltip>
        </Box>
        <Box mt={1} ml={1}>
          <Tooltip title="Download" PopperProps={{ placement: "right" }}>
            <Fab
              sx={{
                backgroundColor: "background.default",
                "&:hover": { backgroundColor: "background.default" },
              }}
              size="small"
              onClick={downloadImage}
            >
              <Download sx={{ color: "text.primary" }} />
            </Fab>
          </Tooltip>
        </Box>
      </div>
      <div className="info">
        <Tooltip
          title={
            <>
              <Typography>Image Info</Typography>
              <ImgInfoLine
                label="Image Provider"
                value={getImgProviderName(background.provider)}
              />
              <ImgInfoLine
                label="Photographer"
                value={background.photographer}
              />
              <ImgInfoLine label="Description" value={background.description} />
            </>
          }
        >
          <Info sx={{ color: "white" }} />
        </Tooltip>
      </div>
      <img
        src={background.preview_img_url}
        style={{ zIndex: 0, cursor: "pointer" }}
        alt="background"
        draggable={false}
      />
    </StyledImageListItem>
  );
};

const ImgInfoLine = ({ label, value }: { label: string; value?: string }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        gap: "1rem",
        textAlign: "right",
      }}
    >
      <Box>{label}</Box>
      <Box>{value}</Box>
    </Box>
  );
};
