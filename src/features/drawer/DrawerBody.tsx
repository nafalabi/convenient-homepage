import React, { useMemo } from "react";
import { useDispatch } from "react-redux";
import { actions as drawerActions } from "./slice";
import { actions as noteActions } from "features/note/slice";
import { actions as bookmarkActions } from "features/bookmark/slice";
import { actions as settingsActions } from "features/settings/slice";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  styled,
} from "@mui/material";
import {
  Settings,
  LibraryBooks,
  CollectionsBookmark,
} from "@mui/icons-material";

const DrawerBodyRoot = styled("div")({
  width: 250,
});

const DrawerBody = ({ ...props }) => {
  const dispatch = useDispatch();
  const items = useMemo(
    () => [
      {
        label: "Notes",
        icon: <LibraryBooks />,
        onClick: () => dispatch(noteActions.toggleNote()),
      },
      {
        label: "Bookmarks",
        icon: <CollectionsBookmark />,
        onClick: () => dispatch(bookmarkActions.toggleBookmark()),
      },
      {
        label: "Settings",
        icon: <Settings />,
        onClick: () => dispatch(settingsActions.toggleSettings()),
      },
    ],
    [dispatch]
  );

  return (
    <DrawerBodyRoot {...props}>
      <List>
        {items.map(({ label, icon, onClick }, index) => (
          <ListItem
            button
            key={`drawer-item-${index}`}
            onClick={() => {
              onClick();
              dispatch(drawerActions.toggleDrawer());
            }}
          >
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText>{label}</ListItemText>
          </ListItem>
        ))}
      </List>
    </DrawerBodyRoot>
  );
};

export default DrawerBody;
