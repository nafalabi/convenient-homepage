import {
  Box,
  Fab,
  ImageList,
  ImageListItem,
  styled,
  Tooltip,
} from "@mui/material";
import { Check, Delete } from "@mui/icons-material";
import { Pagination } from "@mui/material";
import React, { useState } from "react";
import useSubscribeBackgroundImages from "./hooks/useSubscribeBackgroundImages";
import DexieAPI from "app/api/dexie-api";
import BackgroundImage from "app/storage/dexie/BackgroundImage";
import SimpleAccordion from "components/SimpleAccordion";

const StyledImageListItem = styled(ImageListItem)({
  position: "relative",
  "&:hover:after": {
    content: "' '",
    position: "absolute",
    background: "#00000026",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    pointerEvents: "none",
  },
});

const Library = () => {
  const [showingImage] = useState(9);
  const [currentPage, setCurrentPage] = useState(0);
  const queryResult = useSubscribeBackgroundImages(showingImage, currentPage);
  const [selectedBackgroundId, setSelectedBackgroundId] = useState(0);

  const deleteImage = (image: BackgroundImage) => () => image.delete();

  const setAsBackground = (image: BackgroundImage) => async () => {
    DexieAPI.backgroundimage.setAsActive(image.id);
  };

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
                const { preview_img_url, id } = background;

                return (
                  <StyledImageListItem key={id}>
                    {id === selectedBackgroundId && (
                      <Box position="absolute" zIndex={10}>
                        <Box m={1}>
                          <Tooltip title="Delete">
                            <Fab
                              color="secondary"
                              size="small"
                              onClick={deleteImage(background)}
                            >
                              <Delete />
                            </Fab>
                          </Tooltip>
                        </Box>
                        <Box m={1}>
                          <Tooltip title="Set as Background">
                            <Fab
                              color="primary"
                              size="small"
                              onClick={setAsBackground(background)}
                            >
                              <Check />
                            </Fab>
                          </Tooltip>
                        </Box>
                      </Box>
                    )}
                    <img
                      src={preview_img_url}
                      style={{ zIndex: 0, cursor: "pointer" }}
                      alt="background"
                      onClick={() => setSelectedBackgroundId(id ?? 0)}
                      draggable={false}
                    />
                  </StyledImageListItem>
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
