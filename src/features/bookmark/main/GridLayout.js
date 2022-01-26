import { Box, Button, Grid, Paper, Typography, Tooltip } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import useContextMenu from "../hooks/useContextMenu";
import useSubscribeOneLevelBookmarks from "../hooks/useSubscribeOneLevelBookmarks";
import { selectors, actions } from "../slice";
import HomeGreeting from "./HomeGreeting";
import ContextMenu from "./ContextMenu";
import IconRenderer from "components/IconRenderer";
import { IconType } from "constant";

const GridLayout = () => {
  const dispatch = useDispatch();
  const id = useSelector(selectors.selectedBookmark);
  const bookmarks = useSubscribeOneLevelBookmarks(id);
  const { handleClick, handleClose, clickPosition, clickedNodeId } =
    useContextMenu();

  return (
    <>
      {parseInt(id) === 0 && <HomeGreeting />}
      <Grid
        container
        spacing={2}
        justifyContent="flex-start"
        onContextMenu={handleClick}
      >
        {bookmarks.map((bookmark) => {
          const bookmarkDomain = bookmark.url
            ? new URL(bookmark.url).hostname
            : "";
          const isFolder = bookmark.url === undefined;
          const iconId = isFolder
            ? "Folder"
            : `https://www.google.com/s2/favicons?sz=64&domain=${bookmarkDomain}`;
          const iconType = isFolder ? IconType.MATERIAL_ICON : IconType.URL;

          return (
            <Grid item key={bookmark.id}>
              <Box clone p={1}>
                <Paper
                  component={Button}
                  onClick={() => {
                    if (isFolder) {
                      dispatch(actions.selectBookmark(bookmark.id));
                    } else {
                      window.open(bookmark.url);
                    }
                  }}
                >
                  <Tooltip title={bookmark.title}>
                    <Box
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                      width="100px"
                      height="80px"
                      overflow="hidden"
                      data={bookmark.id}
                    >
                      <Box
                        data={bookmark.id}
                        display="flex"
                        mt={isFolder ? "0px" : "4px"}
                        mb="4px"
                      >
                        <IconRenderer
                          iconId={iconId}
                          iconType={iconType}
                          fontSize="large"
                        />
                      </Box>
                      <Typography
                        variant="caption"
                        style={{
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          margin: "auto",
                          textTransform: "none",
                          lineHeight: 1.3,
                        }}
                        data={bookmark.id}
                      >
                        {bookmark.title}
                      </Typography>
                    </Box>
                  </Tooltip>
                </Paper>
              </Box>
            </Grid>
          );
        })}
      </Grid>
      <ContextMenu
        handleClose={handleClose}
        clickPosition={clickPosition}
        clickedNodeId={clickedNodeId}
      />
    </>
  );
};

export default GridLayout;
