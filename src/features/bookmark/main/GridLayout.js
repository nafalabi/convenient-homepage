import { Box, Button, Grid, Paper, Typography, Tooltip } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";

import useContextMenu from "../hooks/useContextMenu";
import useSubscribeOneLevelBookmarks from "../hooks/useSubscribeOneLevelBookmarks";
import { selectors, actions } from "../slice";
import HomeGreeting from "./HomeGreeting";
import ContextMenu from "./ContextMenu";
import IconRenderer from "components/IconRenderer";
import { IconType } from "constant";
import { reorderBookmark } from "../utils";

const GridLayout = () => {
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
        {bookmarks.map((bookmark, index) => {
          return (
            <GridLayoutItem
              bookmark={bookmark}
              nodeIndex={index}
              key={`node-${bookmark.id}`}
              isLastItem={index === bookmarks.length - 1}
            />
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

export const GridLayoutItem = ({ bookmark, nodeIndex, isLastItem }) => {
  const dispatch = useDispatch();
  const bookmarkDomain = bookmark.url ? new URL(bookmark.url).hostname : "";
  const isFolder = bookmark.url === undefined;
  const iconId = isFolder
    ? "Folder"
    : `https://www.google.com/s2/favicons?sz=64&domain=${bookmarkDomain}`;
  const iconType = isFolder ? IconType.MATERIAL_ICON : IconType.URL;
  const dragRestricted =
    bookmark.id === "1" || bookmark.id === "2" || bookmark.id === "3";

  // Drop On Node
  const [{ handlerId, isNodeHovered }, drop] = useDrop({
    accept: "node",
    collect: (monitor) => {
      return {
        handlerId: monitor.getHandlerId(),
        isNodeHovered: monitor.isOver({ shallow: true }),
      };
    },
    drop: (item, monitor) => {
      const isHovered = monitor.isOver({ shallow: true });
      if (isHovered) reorderBookmark(item.id, bookmark.id, "INSIDE", nodeIndex);
    },
  });

  // Drag handle
  const [{ isDragging }, drag, dragPreview] = useDrag({
    type: "node",
    item: () => {
      return { id: bookmark.id };
    },
    collect: (monitor) => {
      return {
        isDragging: monitor.isDragging(),
      };
    },
    canDrag: !dragRestricted,
  });

  dragPreview(getEmptyImage());

  return (
    <Grid item key={bookmark.id}>
      <Paper
        ref={(ref) => {
          drag(ref);
          drop(ref);
        }}
        data-handler-id={handlerId}
        sx={{
          p: 1,
          cursor: "pointer",
          opacity: isDragging ? 0.5 : 1,
          color:
            isNodeHovered && !isDragging
              ? "primary.contrastText"
              : "text.primary",
          backgroundColor:
            isNodeHovered && !isDragging ? "primary.main" : "transparent",
        }}
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
            width="90px"
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
    </Grid>
  );
};
