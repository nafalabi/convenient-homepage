import React from "react";
import { useSelector } from "react-redux";
import GridLayout from "./GridLayout";
import { selectors } from "../slice";
import ListLayout from "./ListLayout";

const BookmarkMain = () => {
  const layout = useSelector(selectors.layoutMode);

  if (layout === "grid") return <GridLayout />;
  if (layout === "list") return <ListLayout />;

  return null;
};

export default BookmarkMain;
