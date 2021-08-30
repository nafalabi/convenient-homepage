import React from "react";
import PropTypes from "prop-types";
import { makeStyles, alpha } from "@material-ui/core/styles";
import TreeItem from "@material-ui/lab/TreeItem";
import Typography from "@material-ui/core/Typography";

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
    color: theme.palette.text.secondary,
  },
  labelText: {
    fontWeight: "inherit",
    flexGrow: 1,
  },
  actionButton: {
    opacity: 0,
  },
  dotIconNote: {
    flexGrow: 1,
    fontSize: "0.5em!important",
    borderBottom: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
  },
}));

function NoteTreeListItem(props) {
  const classes = useTreeItemStyles();
  const {
    labelText,
    labelIcon: LabelIcon,
    ActionButton,
    color,
    bgColor,
    totalChildren,
    ...other
  } = props;

  // Leading Icon, when set to undefined will use the default icon
  // if has children show default icon, if not show dashed horizontal line
  const leadingIcon =
    totalChildren < 1 ? <div className={classes.dotIconNote} /> : undefined;

  return (
    <TreeItem
      expandIcon={leadingIcon}
      collapseIcon={leadingIcon}
      label={
        <div className={classes.labelRoot}>
          <LabelIcon color="inherit" className={classes.labelIcon} />
          <Typography variant="body2" className={classes.labelText}>
            {labelText}
          </Typography>
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
      {...other}
    />
  );
}

NoteTreeListItem.propTypes = {
  bgColor: PropTypes.string,
  color: PropTypes.string,
  labelIcon: PropTypes.elementType.isRequired,
  labelText: PropTypes.string.isRequired,
  ActionButton: PropTypes.any,
};

export default NoteTreeListItem;
