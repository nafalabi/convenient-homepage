import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  GridList,
  GridListTile,
  Typography,
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import { Pagination } from "@material-ui/lab";
import React, { useState } from "react";
import useSubscribeBackgroundImages from "./hooks/useSubscribeBackgroundImages";

const Library = () => {
  const [showingCount, setShowingCount] = useState(9);
  const [currentPage, setCurrentPage] = useState(0);
  const queryResult = useSubscribeBackgroundImages(showingCount, currentPage);

  console.log(queryResult);
  console.log(currentPage);

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
                  {images.map(({ content }, index) => (
                    <GridListTile key={index}>
                      <img
                        src={"data:image/jpg;base64," + content}
                        alt="background"
                      />
                    </GridListTile>
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
