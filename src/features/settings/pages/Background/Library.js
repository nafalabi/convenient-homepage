import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Fab,
  ImageList,
  ImageListItem,
  styled,
  Tooltip,
  Typography,
} from "@mui/material";
import { Check, Delete, ExpandMore } from "@mui/icons-material";
import { Pagination } from '@mui/material';
import React, { useState } from "react";
import localData from "../../../../app/storage/localData";
import useSubscribeBackgroundImages from "./hooks/useSubscribeBackgroundImages";
import { actions as homepageActions } from "../../../homepage/slice";
import { useDispatch } from "react-redux";

const HoverOverlay = styled(Box)({
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
  const dispatch = useDispatch();
  const [showingCount] = useState(9);
  const [currentPage, setCurrentPage] = useState(0);
  const queryResult = useSubscribeBackgroundImages(showingCount, currentPage);
  const [selectedBackgroundId, setSelectedBackgroundId] = useState(0);

  return (
    <Accordion defaultExpanded={true}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Box flexBasis="10rem" flexShrink={0}>
          <Typography>Library</Typography>
        </Box>
        <Box color="text.secondary">
          <Typography variant="caption">Library of Saved Images</Typography>{" "}
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        {queryResult &&
          (() => {
            const { total, images } = queryResult;
            const totalPage = Math.ceil(total / showingCount);

            return (
              <Box width="100%">
                <ImageList cols={3}>
                  {images.map((background) => {
                    const { content, backgroundid } = background;
                    const deleteImage = () => background.delete();
                    const setAsBackground = () => {
                      const { refresh_interval } =
                        localData.backgroundProvider();
                      background.expireat =
                        Math.floor(Date.now() / 1000) + refresh_interval;
                      background.save();
                      dispatch(homepageActions.loadImage(content));
                    };

                    return (
                      <HoverOverlay clone key={backgroundid}>
                        <ImageListItem>
                          {backgroundid === selectedBackgroundId && (
                            <Box position="absolute" zIndex={10}>
                              <Box m={1}>
                                <Tooltip title="Delete">
                                  <Fab
                                    color="secondary"
                                    size="small"
                                    onClick={deleteImage}
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
                                    onClick={setAsBackground}
                                  >
                                    <Check />
                                  </Fab>
                                </Tooltip>
                              </Box>
                            </Box>
                          )}
                          <img
                            src={"data:image/jpg;base64," + content}
                            style={{ zIndex: 0, cursor: "pointer" }}
                            alt="background"
                            onClick={() =>
                              setSelectedBackgroundId(backgroundid)
                            }
                            draggable={false}
                          />
                        </ImageListItem>
                      </HoverOverlay>
                    );
                  })}
                </ImageList>
                <Box mt={1} width="100%" display="flex">
                  <Box clone margin="auto">
                    <Pagination
                      count={totalPage}
                      page={currentPage + 1}
                      onChange={(e, page) => setCurrentPage(page - 1)}
                    />
                  </Box>
                </Box>
              </Box>
            );
          })()}
      </AccordionDetails>
    </Accordion>
  );
};

export default Library;
