import React, { useEffect, useRef } from "react";
import { alpha } from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import Typography from "@mui/material/Typography";
import {
  AdjustedTreeItemStyledProps,
  TreeNodeDragItem,
  TreeNodeProps,
} from "./types";
import { DropTargetMonitor, useDrag, useDrop } from "react-dnd";
import AdjustedTreeItem from "./AdjustedTreeItem";
import { Box, styled } from "@mui/system";
import { getEmptyImage } from "react-dnd-html5-backend";
import DroppableLine from "./DroppableLine";

const PREFIX = "TreeNode";

const classes = {
  labelRoot: `${PREFIX}-label-root`,
  labelIcon: `${PREFIX}-label-icon`,
  labelText: `${PREFIX}-label-text`,
};

const StyledAdjustedTreeItem: any = styled(AdjustedTreeItem, {
  shouldForwardProp: (prop) => prop !== "isDraggedOver",
})<AdjustedTreeItemStyledProps>(({ theme, isDraggedOver }) => ({
  "& .MuiTreeItem-root": {
    color: theme.palette.text.primary,
    "&:hover > .MuiTreeItem-content": {
      // backgroundColor: theme.palette.action.hover,
    },
    "&:focus > .MuiTreeItem-content, &.Mui-selected > .MuiTreeItem-content": {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.grey[100]})`,
      color: "var(--tree-view-color)",
    },
    "&:focus > .MuiTreeItem-content .MuiTreeItem-label, &:hover > .MuiTreeItem-content .MuiTreeItem-label, &.Mui-selected > .MuiTreeItem-content .MuiTreeItem-label":
      {
        backgroundColor: "transparent!important",
      },
  },
  "& > .MuiTreeItem-content": {
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    ...(isDraggedOver
      ? {
          backgroundColor: theme.palette.primary.dark,
          color: theme.palette.primary.contrastText,
          // color: "#fff",
        }
      : {
          color: theme.palette.text.primary,
        }),
    // fontWeight: theme.typography.fontWeightRegular,
    "& .Mui-expanded > &": {
      // fontWeight: theme.typography.fontWeightRegular,
    },
  },
  "& .Mui-expanded": {},
  "& .Mui-selected": {},
  "& .MuiTreeItem-group": {
    marginLeft: 14,
    paddingLeft: 0,
    borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
  },
  "& .MuiTreeItem-label": {
    fontWeight: "inherit",
    color: "inherit",
  },
  [`.${classes.labelRoot}`]: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0.5, 0),
  },
  [`.${classes.labelIcon}`]: {
    marginRight: theme.spacing(1),
    color: "inherit",
  },
  [`.${classes.labelText}`]: {
    fontWeight: "inherit",
    flexGrow: 1,
  },
}));

function TreeNode(props: TreeNodeProps) {
  const {
    labelText,
    labelIcon: LabelIcon,
    totalChildren,
    nodeId,
    isLastItem,
    ...other
  } = props;
  const contextMenuProps = { data: nodeId };

  // Leading Icon, when set to undefined will use the default icon
  // if has children show default icon, if not show dashed horizontal line
  const leadingIcon = totalChildren < 1 ? <div /> : undefined;

  const [{ handlerId, isNodeHovered }, drop] = useDrop({
    accept: "node",
    collect: (monitor: DropTargetMonitor) => {
      return {
        handlerId: monitor.getHandlerId(),
        isNodeHovered: monitor.isOver({ shallow: true }),
      };
    },
    hover: (item: TreeNodeDragItem, monitor: DropTargetMonitor) => {
      console.log(item, nodeId);
    },
  });

  const [{ handlerIdBeforeNode, isBeforeNodeHovered }, dropBeforeNode] =
    useDrop({
      accept: "node",
      collect: (monitor: DropTargetMonitor) => {
        return {
          handlerIdBeforeNode: monitor.getHandlerId(),
          isBeforeNodeHovered: monitor.isOver({ shallow: true }),
        };
      },
      hover: (item: TreeNodeDragItem, monitor: DropTargetMonitor) => {
        console.log(item, nodeId);
      },
    });

  const [{ handlerIdAfterNode, isAfterNodeHovered }, dropAfterNode] = useDrop({
    accept: "node",
    collect: (monitor: DropTargetMonitor) => {
      return {
        handlerIdAfterNode: monitor.getHandlerId(),
        isAfterNodeHovered: monitor.isOver({ shallow: true }),
      };
    },
    hover: (item: TreeNodeDragItem, monitor: DropTargetMonitor) => {
      console.log(item, nodeId);
    },
  });

  const [{ isDragging }, drag, dragPreview] = useDrag({
    type: "node",
    item: () => {
      return { id: nodeId };
    },
    collect: (monitor) => {
      return {
        isDragging: monitor.isDragging(),
      };
    },
  });

  dragPreview(getEmptyImage());

  return (
    <>
      <DroppableLine
        ref={dropBeforeNode}
        data-handler-id={handlerIdBeforeNode}
        isHovered={isBeforeNodeHovered}
      />
      <Box ref={drop} data-handler-id={handlerId}>
        <StyledAdjustedTreeItem
          ref={drag}
          isDraggedOver={isNodeHovered}
          expandIcon={leadingIcon}
          collapseIcon={leadingIcon}
          label={
            <div className={classes.labelRoot} {...contextMenuProps}>
              <LabelIcon color="inherit" className={classes.labelIcon} />
              <Typography
                variant="body2"
                className={classes.labelText}
                {...contextMenuProps}
              >
                {labelText}
              </Typography>
            </div>
          }
          style={{
            opacity: isDragging ? 0.5 : 1,
          }}
          nodeId={nodeId}
          {...contextMenuProps}
          {...other}
        />
      </Box>
      {isLastItem && (
        <DroppableLine
          ref={dropAfterNode}
          isHovered={isAfterNodeHovered}
          data-handler-id={handlerIdAfterNode}
        />
      )}
    </>
  );
}

export default TreeNode;
