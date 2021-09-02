import React from "react";
import {
  Breadcrumbs,
  darken,
  Link,
  useTheme,
  withStyles,
} from "@material-ui/core";
import { Home, NavigateNext } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { actions, selectors } from "../slice";

const StyledBreadcrumbs = withStyles((theme) => ({
  li: {
    color: darken("#fff", 0.1),
    cursor: "pointer",
    "&:last-child": {
      color: "#fff",
      cursor: "default",
    },
    "& > a": {
      textDecoration: "none!important",
    },
  },
  separator: {
    color: darken("#fff", 0.1),
  },
}))(Breadcrumbs);

const NoteBreadcrumb = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const noteStack = useSelector(selectors.noteStack);

  return (
    <StyledBreadcrumbs
      maxItems={5}
      itemsAfterCollapse={3}
      separator={<NavigateNext fontSize="small" />}
    >
      <Link
        color="inherit"
        style={{ display: "flex" }}
        onClick={() => dispatch(actions.selectNote(0))}
      >
        <Home
          style={{ marginRight: theme.spacing(0.5), width: 20, height: 20 }}
        />
        Home
      </Link>
      {noteStack.map((noteData, index) => {
        return (
          <Link
            color="inherit"
            key={noteData.noteid}
            onClick={() => {
              if (index + 1 < noteStack.length)
                dispatch(actions.selectNote(noteData.noteid));
            }}
          >
            {noteData.notename}
          </Link>
        );
      })}
    </StyledBreadcrumbs>
  );
};

export default NoteBreadcrumb;
