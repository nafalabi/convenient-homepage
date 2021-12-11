import { Box, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { Image, Settings } from "@mui/icons-material";
import React, { RefObject } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions, PAGE_BACKGROUND, PAGE_GENERAL } from "./slice";

const pages = [
  {
    icon: <Settings />,
    label: "General",
    pageIndex: PAGE_GENERAL,
  },
  {
    icon: <Image />,
    label: "Background",
    pageIndex: PAGE_BACKGROUND,
  },
];

const SettingsSidebar = (props: { dialogRef: RefObject<HTMLDivElement> }) => {
  const dispatch = useDispatch();
  const curPage = useSelector(({ settings }) => settings.page);

  return (
    <Box>
      <List dense>
        {pages.map(({ icon, label, pageIndex }, index) => (
          <ListItem
            key={index}
            button
            onClick={() => dispatch(actions.changePage(pageIndex))}
            selected={curPage === pageIndex}
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
