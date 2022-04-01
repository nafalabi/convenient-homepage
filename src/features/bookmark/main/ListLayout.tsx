import {
  ListItem,
  ListItemIcon,
  ListItemText,
  List,
  Tooltip,
} from "@mui/material";
import { DragIndicator, Folder } from "@mui/icons-material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import useContextMenu from "../hooks/useContextMenu";
import useSubscribeOneLevelBookmarks from "../hooks/useSubscribeOneLevelBookmarks";
import { selectors, actions } from "../slice";
import ContextMenu from "./ContextMenu";
import HomeGreeting from "./HomeGreeting";
import EmptyFolder from "./EmptyFolder";
import { useRef } from "react";
import { useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import DroppableLine from "components/TreeViewDnd/DroppableLine";
import AppController from "app/controller";

const ListLayout = () => {
  const id = useSelector(selectors.selectedBookmark);
  const bookmarks = useSubscribeOneLevelBookmarks(id);
  const { handleClick, handleClose, clickPosition, clickedNodeId } =
    useContextMenu(true);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (el) {
      const rootContainer = el.parentElement;
      rootContainer?.setAttribute("data", String(id));
      rootContainer?.addEventListener("contextmenu", handleClick as any);
      return () =>
        rootContainer?.removeEventListener("contextmenu", handleClick as any);
    }
  }, [rootRef, handleClick, id]);

  const contextMenuData = { data: id };

  return (
    <div ref={rootRef} {...contextMenuData} onContextMenu={handleClick}>
      {Number(id) === 0 && <HomeGreeting />}
      {bookmarks.length === 0 && <EmptyFolder />}
      <List dense>
        {bookmarks.map((bookmark, index) => (
          <ListLayoutItem
            bookmark={bookmark}
            nodeIndex={index}
            key={`${index}-${bookmark.id}`}
            isLastItem={index === bookmarks.length - 1}
          />
        ))}
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

const ListLayoutItem = ({
  bookmark,
  nodeIndex,
  isLastItem,
}: {
  bookmark: chrome.bookmarks.BookmarkTreeNode;
  nodeIndex: number;
  isLastItem: boolean;
}) => {
  const dispatch = useDispatch();
  const bookmarkDomain = bookmark.url ? new URL(bookmark.url).hostname : "";
  const isFolder = bookmark.url === undefined;
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
    drop: (item: { id: string }, monitor) => {
      const isHovered = monitor.isOver({ shallow: true });
      if (isHovered)
        AppController.bookmark.reorderBookmark(
          item.id,
          bookmark.id,
          "INSIDE",
          nodeIndex
        );
    },
  });

  // Drop Before Node
  const [{ handlerIdBeforeNode, isBeforeNodeHovered }, dropBeforeNode] =
    useDrop({
      accept: "node",
      collect: (monitor) => {
        return {
          handlerIdBeforeNode: monitor.getHandlerId(),
          isBeforeNodeHovered: monitor.isOver({ shallow: true }),
        };
      },
      drop: (item: { id: string }, monitor) => {
        const isHovered = monitor.isOver({ shallow: true });
        if (isHovered)
          AppController.bookmark.reorderBookmark(
            item.id,
            bookmark.id,
            "BEFORE",
            nodeIndex
          );
      },
    });

  // Drop After Node
  const [{ handlerIdAfterNode, isAfterNodeHovered }, dropAfterNode] = useDrop({
    accept: "node",
    collect: (monitor) => {
      return {
        handlerIdAfterNode: monitor.getHandlerId(),
        isAfterNodeHovered: monitor.isOver({ shallow: true }),
      };
    },
    drop: (item: { id: string }, monitor) => {
      const isHovered = monitor.isOver({ shallow: true });
      if (isHovered)
        AppController.bookmark.reorderBookmark(
          item.id,
          bookmark.id,
          "AFTER",
          nodeIndex
        );
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

  const contextMenuData = { data: bookmark.id };

  return (
    <Tooltip title={bookmark.title} enterDelay={1000}>
      <>
        <DroppableLine
          data-handler-id={handlerIdBeforeNode}
          ref={dropBeforeNode}
          isHovered={isBeforeNodeHovered}
        />
        <ListItem
          data-handler-id={handlerId}
          ref={(ref) => {
            drag(ref);
            drop(ref);
          }}
          // data={bookmark.id}
          {...contextMenuData}
          button
          onClick={() => {
            if (isFolder) {
              dispatch(actions.selectBookmark(bookmark.id));
            } else {
              window.open(bookmark.url);
            }
          }}
          sx={{
            cursor: "pointer",
            opacity: isDragging ? 0.5 : 1,
            color:
              isNodeHovered && !isDragging
                ? "primary.contrastText"
                : "text.primary",
            backgroundColor:
              isNodeHovered && !isDragging ? "primary.main" : "transparent",
          }}
        >
          <ListItemIcon sx={{ color: "inherit" }}>
            {!dragRestricted && <DragIndicator sx={{ cursor: "move" }} />}
            &nbsp; &nbsp;
            {isFolder ? (
              <Folder />
            ) : (
              <img
                src={`https://www.google.com/s2/favicons?sz=16&domain=${bookmarkDomain}`}
                alt="favicon"
                style={{ height: "100%", width: "auto", alignSelf: "center" }}
              />
            )}
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
              // data: bookmark.id,
              ...contextMenuData,
            }}
          />
        </ListItem>
        {isLastItem && (
          <DroppableLine
            ref={dropAfterNode}
            isHovered={isAfterNodeHovered}
            data-handler-id={handlerIdAfterNode}
          />
        )}
      </>
    </Tooltip>
  );
};
