import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Fab,
  GridList,
  GridListTile,
  styled,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { Check, Delete, ExpandMore } from "@material-ui/icons";
import { Pagination } from "@material-ui/lab";
import React, { useState } from "react";
import useSubscribeBackgroundImages from "./hooks/useSubscribeBackgroundImages";

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
  const [showingCount, setShowingCount] = useState(9);
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
                <GridList cols={3}>
                  {images.map(({ content, backgroundid }) => (
                    <HoverOverlay clone key={backgroundid}>
                      <GridListTile>
                        {backgroundid === selectedBackgroundId && (
                          <Box position="absolute" zIndex={10}>
                            <Box m={1}>
                              <Tooltip title="Delete">
                                <Fab color="secondary" size="small">
                                  <Delete />
                                </Fab>
                              </Tooltip>
                            </Box>
                            <Box m={1}>
                              <Tooltip title="Set as Background">
                                <Fab color="primary" size="small">
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
                          onClick={() => setSelectedBackgroundId(backgroundid)}
                          draggable={false}
                        />
                      </GridListTile>
                    </HoverOverlay>
                  ))}
                </GridList>
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
