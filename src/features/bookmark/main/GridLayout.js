import {
  Box,
  Button,
  Grid,
  Paper,
  Typography,
  Tooltip,
  useTheme,
} from "@material-ui/core";
import { Folder } from "@material-ui/icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import useContextMenu from "../hooks/useContextMenu";
import useSubscribeOneLevelBookmarks from "../hooks/useSubscribeOneLevelBookmarks";
import { selectors, actions } from "../slice";
import HomeGreeting from "./HomeGreeting";
import ContextMenu from "./ContextMenu";

const GridLayout = () => {
  const theme = useTheme();
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
          const icon = bookmarkDomain ? (
            <img
              src={`https://www.google.com/s2/favicons?sz=64&domain=${bookmarkDomain}`}
              alt="favicon"
              style={{ height: "100%", width: "auto", pointerEvents: "none" }}
            />
          ) : (
            <Box
              clone
              color={theme.palette.grey[600]}
              style={{ pointerEvents: "none" }}
            >
              <Folder fontSize="large" />
            </Box>
          );
          const isFolder = bookmark.url === undefined;

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
                      data={bookmark.id}
                    >
                      <Box height="36px" width="36px" data={bookmark.id}>
                        {icon}
                      </Box>
                      <Typography
                        variant="caption"
                        style={{
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          margin: "auto",
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
