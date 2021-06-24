import React from "react";
import PropTypes from "prop-types";
import { makeStyles, fade } from "@material-ui/core/styles";
import TreeItem from "@material-ui/lab/TreeItem";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Tooltip from "@material-ui/core/Tooltip";

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
    borderLeft: `1px dashed ${fade(theme.palette.text.primary, 0.4)}`,
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

function BookmarkTreeListItem(props) {
  const classes = useTreeItemStyles();
  const {
    labelText,
    labelIcon,
    ActionButton,
    color,
    bgColor,
    nodeId,
    ...other
  } = props;

  const contextMenuProps = { data: nodeId };

  return (
    <TreeItem
      label={
        <div className={classes.labelRoot} {...contextMenuProps}>
          <Box clone color="inherit" className={classes.labelIcon}>
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
      style={{
        "--tree-view-color": color,
        "--tree-view-bg-color": bgColor,
      }}
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
}

BookmarkTreeListItem.propTypes = {
  bgColor: PropTypes.string,
  color: PropTypes.string,
  labelIcon: PropTypes.any.isRequired,
  labelText: PropTypes.string.isRequired,
  ActionButton: PropTypes.any,
};

export default BookmarkTreeListItem;
