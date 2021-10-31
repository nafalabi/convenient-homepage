import {
  ListItem,
  ListItemIcon,
  ListItemText,
  List,
  Tooltip,
  Box,
} from "@mui/material";
import { DragIndicator, Folder } from "@mui/icons-material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import useContextMenu from "../hooks/useContextMenu";
import useSubscribeOneLevelBookmarks from "../hooks/useSubscribeOneLevelBookmarks";
import { selectors, actions } from "../slice";
import ContextMenu from "./ContextMenu";
import HomeGreeting from "./HomeGreeting";
import { Droppable, Draggable } from "react-beautiful-dnd";
import EmptyFolder from "./EmptyFolder";
import { useRef } from "react";
import { useEffect } from "react";

const ListLayout = () => {
  const dispatch = useDispatch();
  const id = useSelector(selectors.selectedBookmark);
  const bookmarks = useSubscribeOneLevelBookmarks(id);
  const { handleClick, handleClose, clickPosition, clickedNodeId } =
    useContextMenu(true);
  const rootRef = useRef();

  useEffect(() => {
    const el = rootRef.current;
    if (el) {
      const rootContainer = el.parentElement;
      rootContainer.setAttribute("data", id);
      rootContainer.addEventListener("contextmenu", handleClick);
      return () =>
        rootContainer.removeEventListener("contextmenu", handleClick);
    }
  }, [rootRef, handleClick, id]);

  return (
    <div ref={rootRef} data={id}>
      {parseInt(id) === 0 && <HomeGreeting />}
      {bookmarks.length === 0 && <EmptyFolder />}
      <Droppable droppableId={`list-${id}`} isCombineEnabled={true}>
        {(provided, snapshot) => (
          <List dense onContextMenu={handleClick} ref={provided.innerRef}>
            {bookmarks.map((bookmark, index) => {
              const bookmarkDomain = bookmark.url
                ? new URL(bookmark.url).hostname
                : "";
              const icon = bookmarkDomain ? (
                <img
                  src={`https://www.google.com/s2/favicons?sz=16&domain=${bookmarkDomain}`}
                  alt="favicon"
                  style={{ height: "100%", width: "auto", alignSelf: "center" }}
                />
              ) : (
                <Folder />
              );
              const isFolder = bookmark.url === undefined;

              return (
                <Draggable
                  key={bookmark.id}
                  draggableId={`${isFolder ? "folder" : "bookmark"}-${
                    bookmark.id
                  }`}
                  index={index}
                  isDragDisabled={
                    bookmark.id === "1" ||
                    bookmark.id === "2" ||
                    bookmark.id === "3"
                  }
                >
                  {(provided, snapshot) => (
                    <Tooltip title={bookmark.title} enterDelay={1000}>
                      <ListItem
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        // draggable="true"
                        data={bookmark.id}
                        button
                        onClick={() => {
                          if (isFolder) {
                            dispatch(actions.selectBookmark(bookmark.id));
                          } else {
                            window.open(bookmark.url);
                          }
                        }}
                        style={{
                          ...provided.draggableProps?.style,
                          ...provided.dragHandleProps?.style,
                          ...(snapshot.isDragging
                            ? {
                                backgroundColor: "white",
                                boxShadow: "grey 0px 2px 4px",
                              }
                            : {}),
                          cursor: "pointer",
                        }}
                      >
                        <ListItemIcon>
                          {!(
                            bookmark.id === "1" ||
                            bookmark.id === "2" ||
                            bookmark.id === "3"
                          ) && (
                            <Box clone style={{ cursor: "move" }}>
                              <DragIndicator />
                            </Box>
                          )}
                          &nbsp; &nbsp;
                          {icon}
                          &nbsp; &nbsp;
                        </ListItemIcon>
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
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </List>
        )}
      </Droppable>
      <ContextMenu
        handleClose={handleClose}
        clickPosition={clickPosition}
        clickedNodeId={clickedNodeId}
      />
    </div>
  );
};

export default ListLayout;
