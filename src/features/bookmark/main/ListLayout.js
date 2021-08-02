import {
  ListItem,
  ListItemIcon,
  ListItemText,
  List,
  Tooltip,
  Box,
} from "@material-ui/core";
import { Folder } from "@material-ui/icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import useSubscribeOneLevelBookmarks from "../hooks/useSubscribeOneLevelBookmarks";
import { selectors, actions } from "../slice";
import HomeGreeting from "./HomeGreeting";
import LayoutSwitcher from "./LayoutSwitcher";

const ListLayout = () => {
  const dispatch = useDispatch();
  const id = useSelector(selectors.selectedBookmark);
  const bookmarks = useSubscribeOneLevelBookmarks(id);

  return (
    <div>
      <Box display="flex" justifyContent="flex-end" mb={1}>
        <LayoutSwitcher />
      </Box>
      {parseInt(id) === 0 && <HomeGreeting />}
      <List dense>
        {bookmarks.map((bookmark) => {
          const bookmarkDomain = bookmark.url
            ? new URL(bookmark.url).hostname
            : "";
          const icon = bookmarkDomain ? (
            <img
              src={`https://www.google.com/s2/favicons?sz=16&domain=${bookmarkDomain}`}
              alt="favicon"
              style={{ height: "100%", width: "auto" }}
            />
          ) : (
            <Folder />
          );
          const isFolder = bookmark.url === undefined;

          return (
            <Tooltip title={bookmark.title} enterDelay={1000} key={bookmark.id}>
              <ListItem
                button
                onClick={() => {
                  if (isFolder) {
                    dispatch(actions.selectBookmark(bookmark.id));
                  }
                }}
              >
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText
                  primary={bookmark.title}
                  primaryTypographyProps={{
                    style: {
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                    },
                  }}
                />
              </ListItem>
            </Tooltip>
          );
        })}
      </List>
    </div>
  );
};

export default ListLayout;
