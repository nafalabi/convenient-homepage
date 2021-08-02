import {
  Box,
  Button,
  Grid,
  Paper,
  Typography,
  Tooltip,
} from "@material-ui/core";
import { Folder } from "@material-ui/icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import useSubscribeOneLevelBookmarks from "../hooks/useSubscribeOneLevelBookmarks";
import { selectors, actions } from "../slice";
import HomeGreeting from "./HomeGreeting";
import LayoutSwitcher from "./LayoutSwitcher";

const GridLayout = () => {
  const dispatch = useDispatch();
  const id = useSelector(selectors.selectedBookmark);
  const bookmarks = useSubscribeOneLevelBookmarks(id);

  return (
    <>
      <Box mb={2}>
        <Box display="flex" justifyContent="flex-end" mb={1}>
          <LayoutSwitcher />
        </Box>
      </Box>
      {parseInt(id) === 0 && <HomeGreeting />}
      <Grid container spacing={2} justifyContent="flex-start">
        {bookmarks.map((bookmark) => {
          const bookmarkDomain = bookmark.url
            ? new URL(bookmark.url).hostname
            : "";
          const icon = bookmarkDomain ? (
            <img
              src={`https://www.google.com/s2/favicons?sz=64&domain=${bookmarkDomain}`}
              alt="favicon"
              style={{ height: "100%", width: "auto" }}
            />
          ) : (
            <Folder fontSize="large" />
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
                    >
                      <Box height="40px" width="40px">
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
    </>
  );
};

export default GridLayout;
