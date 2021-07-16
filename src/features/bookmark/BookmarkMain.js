import {
  Box,
  Button,
  Grid,
  Paper,
  Typography,
  Tooltip,
} from "@material-ui/core";
import { Bookmark } from "@material-ui/icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import useSubscribeOneLevelBookmarks from "./hooks/useSubscribeOneLevelBookmarks";
import { selectors, actions } from "./slice";

const BookmarkMain = () => {
  const dispatch = useDispatch();
  const id = useSelector(selectors.selectedBookmark);
  const bookmarks = useSubscribeOneLevelBookmarks(id);

  return (
    <div>
      {parseInt(id) === 0 && <HomeGreetings />}
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
            <Bookmark fontSize="large" />
          );

          return (
            <Grid item key={bookmark.id}>
              <Box clone p={1}>
                <Paper
                  component={Button}
                  onClick={() => {
                    dispatch(actions.selectBookmark(bookmark.id));
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
    </div>
  );
};

const HomeGreetings = () => {
  return (
    <>
      <Typography variant="h4">Welcome</Typography>
      <Box maxWidth="300px" lineHeight="1.5" mb={3}>
        <Typography variant="subtitle1">
          This is the homepage of Bookmarks
        </Typography>
        <Typography variant="body2">
          Please select one of the folders below
        </Typography>
      </Box>
    </>
  );
};

export default BookmarkMain;
