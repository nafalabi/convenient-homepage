import React, { useMemo } from "react";
import { useDispatch } from "react-redux";
import { actions } from "./slice";
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
  Apps,
  Tab,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import sleep from "app/utils/sleep";

const DrawerBodyRoot = styled("div")({
  width: 250,
});

const DrawerBody = ({ ...props }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const items = useMemo(
    () => [
      {
        label: "Notes",
        icon: <LibraryBooks />,
        onClick: () => navigate("/note"),
      },
      {
        label: "Bookmarks",
        icon: <CollectionsBookmark />,
        onClick: () => navigate("/bookmark"),
      },
      {
        label: "Settings",
        icon: <Settings />,
        onClick: () => navigate("/setting"),
      },
      {
        label: "Chrome apps",
        icon: <Apps />,
        onClick: () => actions.handleOpenChromeApps(),
      },
      {
        label: "Original Homepage",
        icon: <Tab />,
        onClick: () => actions.handleOpenOriginalHomepage(),
      },
    ],
    [navigate]
  );

  return (
    <DrawerBodyRoot {...props}>
      <List>
        {items.map(({ label, icon, onClick }, index) => (
          <ListItem
            button
            key={`drawer-item-${index}`}
            onClick={async () => {
              dispatch(actions.setOpen(false));
              await sleep(50);
              onClick();
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
