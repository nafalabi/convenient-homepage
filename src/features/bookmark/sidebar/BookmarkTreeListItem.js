import React, { createRef, useEffect } from "react";
import PropTypes from "prop-types";
import { alpha, useTheme } from "@mui/material/styles";
import makeStyles from '@mui/styles/makeStyles';
import TreeItem from "@mui/lab/TreeItem";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";

const useTreeItemStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.text.primary,
    "&:hover > $content": {
      // backgroundColor: theme.palette.action.hover,
    },
    "&:focus > $content, &$selected > $content": {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.grey[100]})`,
      color: "var(--tree-view-color)",
    },
    "&:focus > $content $label, &:hover > $content $label, &$selected > $content $label":
      {
        backgroundColor: "transparent!important",
      },
    "&:last-child": {
      marginBottom: theme.spacing(1),
    },
  },
  content: {
    color: theme.palette.text.primary,
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    "$expanded > &": {
      fontWeight: theme.typography.fontWeightRegular,
    },
  },
  group: {
    marginLeft: 14,
    paddingLeft: 0,
    borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
  },
  expanded: {},
  selected: {},
  label: {
    fontWeight: "inherit",
    color: "inherit",
  },
  labelRoot: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0.5, 0),
    "&:hover $actionButton": {
      opacity: 1,
    },
  },
  labelIcon: {
    marginRight: theme.spacing(1),
  },
  labelText: {
    fontWeight: "inherit",
    flexGrow: 1,
    whiteSpace: "nowrap",
  },
  actionButton: {
    opacity: 0,
  },
}));

const BookmarkTreeListItem = React.forwardRef((props, setDroppableRef) => {
  const classes = useTreeItemStyles();
  const theme = useTheme();
  const {
    labelText,
    labelIcon,
    ActionButton,
    nodeId,
    isDraggingOver,
    ...other
  } = props;
  const contextMenuProps = { data: nodeId };
  const rootRef = createRef();

  useEffect(() => {
    if (rootRef.current) {
      const rootEl = rootRef.current;
      const el = rootEl.querySelector(".MuiTreeItem-label");
      el.style.cssText = isDraggingOver
        ? `background-color: ${theme.palette.grey[400]} !important`
        : "background-color: initial";
    }
  }, [isDraggingOver, rootRef, theme]);

  useEffect(() => {
    const rootEl = rootRef.current;
    const treeButtonEl = rootEl.querySelector(".MuiTreeItem-content");
    setDroppableRef(treeButtonEl);
  }, [rootRef, setDroppableRef]);

  return (
    <TreeItem
      ref={(val) => {
        rootRef.current = val;
      }}
      label={
        <div className={classes.labelRoot} {...contextMenuProps}>
          <Box
            clone
            color={theme.palette.grey[600]}
            className={classes.labelIcon}
          >
            {typeof labelIcon == "string" ? (
              <img
                src={labelIcon}
                style={{ height: "auto", width: "auto" }}
                alt="icon"
              />
            ) : (
              labelIcon
            )}
          </Box>
          <Tooltip title={labelText}>
            <Typography
              variant="body2"
              className={classes.labelText}
              {...contextMenuProps}
            >
              {labelText}
            </Typography>
          </Tooltip>
          <div className={classes.actionButton}>{ActionButton}</div>
        </div>
      }
      style={
        {
          // backgroundColor: isDraggingOver ? theme.palette.grey[400] : "initial",
        }
      }
      classes={{
        root: classes.root,
        content: classes.content,
        expanded: classes.expanded,
        selected: classes.selected,
        group: classes.group,
        label: classes.label,
      }}
      nodeId={nodeId}
      {...contextMenuProps}
      {...other}
    />
  );
});

BookmarkTreeListItem.propTypes = {
  bgColor: PropTypes.string,
  color: PropTypes.string,
  labelIcon: PropTypes.any.isRequired,
  labelText: PropTypes.string.isRequired,
  ActionButton: PropTypes.any,
  isDraggingOver: PropTypes.bool.isRequired,
};

export default BookmarkTreeListItem;
