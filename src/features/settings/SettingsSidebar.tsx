import { Box, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { Image, LibraryBooks, Settings, Storage } from "@mui/icons-material";
import React, { RefObject } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "./slice";
import { SettingsPage } from "./types";

const pages = [
  {
    icon: <Settings />,
    label: "General",
    page: SettingsPage.GENERAL,
  },
  {
    icon: <Image />,
    label: "Background",
    page: SettingsPage.BACKGROUND,
  },
  {
    icon: <LibraryBooks />,
    label: "Note",
    page: SettingsPage.NOTE,
  },
  {
    icon: <Storage />,
    label: "Database",
    page: SettingsPage.DATABASE,
  },
];

const SettingsSidebar = (props: { dialogRef: RefObject<HTMLDivElement> }) => {
  const dispatch = useDispatch();
  const curPage = useSelector(({ settings }) => settings.page);

  return (
    <Box>
      <List dense>
        {pages.map(({ icon, label, page }, index) => (
          <ListItem
            key={index}
            button
            onClick={() => dispatch(actions.changePage(page))}
            selected={curPage === page}
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
