import {
  ListItem,
  ListItemIcon,
  ListItemText,
  List,
  Tooltip,
  Box,
} from "@material-ui/core";
import { DragIndicator, Folder } from "@material-ui/icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import useContextMenu from "../hooks/useContextMenu";
import useSubscribeOneLevelBookmarks from "../hooks/useSubscribeOneLevelBookmarks";
import { selectors, actions } from "../slice";
import ContextMenu from "./ContextMenu";
import HomeGreeting from "./HomeGreeting";
import { Droppable, Draggable } from "react-beautiful-dnd";

const ListLayout = () => {
  const dispatch = useDispatch();
  const id = useSelector(selectors.selectedBookmark);
  const bookmarks = useSubscribeOneLevelBookmarks(id);
  const { handleClick, handleClose, clickPosition, clickedNodeId } =
    useContextMenu();

  return (
    <div>
      {parseInt(id) === 0 && <HomeGreeting />}
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
