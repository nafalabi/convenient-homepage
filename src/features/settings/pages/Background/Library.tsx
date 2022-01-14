import {
  Box,
  Fab,
  ImageList,
  ImageListItem,
  styled,
  Tooltip,
  Typography,
} from "@mui/material";
import { Check, Delete, Download, Info } from "@mui/icons-material";
import { Pagination } from "@mui/material";
import React, { useState } from "react";
import useSubscribeBackgroundImages from "./hooks/useSubscribeBackgroundImages";
import DexieAPI from "app/api/dexie-api";
import SimpleAccordion from "components/SimpleAccordion";
import BackgroundImage from "app/storage/dexie/BackgroundImage";
import getImgProviderName from "app/utils/getImgProviderName";

const Library = () => {
  const [showingImage] = useState(9);
  const [currentPage, setCurrentPage] = useState(0);
  const queryResult = useSubscribeBackgroundImages(showingImage, currentPage);

  if (queryResult === undefined) return null;

  const { total, images } = queryResult;
  const totalPage = Math.ceil(total / showingImage);

  return (
    <SimpleAccordion
      title="Background Library"
      subtitle="List of Available Images"
    >
      <>
        {
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
        }
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
}));

const BackgroundImagePreview = ({
  background,
}: {
  id?: number;
  background: BackgroundImage;
}) => {
  const isActive = Boolean(background.active);

  const deleteImage = () => background.delete();

  const setAsBackground = () => {
    DexieAPI.backgroundimage.setAsActive(background.id);
  };

  const downloadImage = () => {
    DexieAPI.backgroundimage.downloadImage(background.id);
  };

  return (
    <StyledImageListItem className={isActive ? "active" : ""}>
      <div className="action">
        <Box m={1}>
          <Tooltip title="Delete" PopperProps={{ placement: "right" }}>
            <Fab color="secondary" size="small" onClick={deleteImage}>
              <Delete />
            </Fab>
          </Tooltip>
        </Box>
        <Box m={1}>
          <Tooltip
            title="Set as Background"
            PopperProps={{ placement: "right" }}
          >
            <Fab color="primary" size="small" onClick={setAsBackground}>
              <Check />
            </Fab>
          </Tooltip>
        </Box>
        <Box m={1}>
          <Tooltip title="Download" PopperProps={{ placement: "right" }}>
            <Fab color="inherit" size="small" onClick={downloadImage}>
              <Download />
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
