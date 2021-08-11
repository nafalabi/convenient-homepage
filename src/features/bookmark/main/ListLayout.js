import {
  ListItem,
  ListItemIcon,
  ListItemText,
  List,
  Tooltip,
} from "@material-ui/core";
import { Folder } from "@material-ui/icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import useContextMenu from "../hooks/useContextMenu";
import useSubscribeOneLevelBookmarks from "../hooks/useSubscribeOneLevelBookmarks";
import { selectors, actions } from "../slice";
import ContextMenu from "./ContextMenu";
import HomeGreeting from "./HomeGreeting";

const ListLayout = () => {
  const dispatch = useDispatch();
  const id = useSelector(selectors.selectedBookmark);
  const bookmarks = useSubscribeOneLevelBookmarks(id);
  const { handleClick, handleClose, clickPosition, clickedNodeId } =
    useContextMenu();

  return (
    <div>
      {parseInt(id) === 0 && <HomeGreeting />}
      <List dense onContextMenu={handleClick}>
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
                data={bookmark.id}
                button
                onClick={() => {
                  if (isFolder) {
                    dispatch(actions.selectBookmark(bookmark.id));
                  } else {
                    window.open(bookmark.url);
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
                    data: bookmark.id,
                  }}
                />
              </ListItem>
            </Tooltip>
          );
        })}
      </List>
      <ContextMenu
        handleClose={handleClose}
        clickPosition={clickPosition}
        clickedNodeId={clickedNodeId}
      />
    </div>
  );
};

export default ListLayout;
