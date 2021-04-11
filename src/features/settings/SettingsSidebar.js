import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { Image, Settings } from "@material-ui/icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions, PAGE_BACKGROUND, PAGE_GENERAL, selectors } from "./slice";

const pages = [
  {
    icon: <Settings />,
    label: "General",
    pageNumber: PAGE_GENERAL,
  },
  {
    icon: <Image />,
    label: "Background",
    pageNumber: PAGE_BACKGROUND,
  },
];

const SettingsSidebar = () => {
  const dispatch = useDispatch();
  const curPage = useSelector(selectors.page);

  return (
    <Box>
      <List dense>
        {pages.map(({ icon, label, pageNumber }, index) => (
          <ListItem
            key={index}
            button
            onClick={() => dispatch(actions.changePage(pageNumber))}
            selected={curPage === pageNumber}
          >
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText>{label}</ListItemText>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default SettingsSidebar;
