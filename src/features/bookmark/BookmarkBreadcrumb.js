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
import { actions, selectors } from "./slice";

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

const BookmarkBreadcrumb = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const folderStack = useSelector(selectors.folderStack);

  return (
    <StyledBreadcrumbs
      maxItems={5}
      itemsAfterCollapse={3}
      separator={<NavigateNext fontSize="small" />}
    >
      <Link
        color="inherit"
        style={{ display: "flex" }}
        onClick={() => dispatch(actions.selectBookmark("0"))}
      >
        <Home
          style={{ marginRight: theme.spacing(0.5), width: 20, height: 20 }}
        />
        Home
      </Link>
      {folderStack.map((bookmarkData, index) => {
        return (
          <Link
            color="inherit"
            key={bookmarkData.id}
            onClick={() => {
              if (index + 1 < folderStack.length)
                dispatch(actions.selectBookmark(bookmarkData.id));
            }}
          >
            {bookmarkData.title}
          </Link>
        );
      })}
    </StyledBreadcrumbs>
  );
};

export default BookmarkBreadcrumb;
