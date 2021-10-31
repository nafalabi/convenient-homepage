import React, { useMemo } from "react";
import { useDispatch } from "react-redux";
import { actions as sidebarActions } from "./slice";
import { actions as todoActions } from "../todo/slice";
import { actions as noteActions } from "../note/slice";
import { actions as bookmarkActions } from "../bookmark/slice";
import { actions as settingsActions } from "../settings/slice";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  styled,
} from "@mui/material";
import ListIcon from "@mui/icons-material/List";
import {
  Search,
  Settings,
  LibraryBooks,
  CollectionsBookmark,
} from "@mui/icons-material";
import InputWithConfirmation from "../../components/InputWithConfirmation";

const SidebarBodyRoot = styled("div")({
  width: 250,
});

const SidebarBody = ({ ...props }) => {
  const dispatch = useDispatch();
  const items = useMemo(
    () => [
      {
        label: "Todo List",
        icon: <ListIcon />,
        onClick: () => dispatch(todoActions.toggleTodo()),
      },
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
    <SidebarBodyRoot {...props}>
      <List>
        <ListItem>
          <InputWithConfirmation
            onConfirm={(value) => {}}
            inputProps={{ style: { fontSize: 16 } }}
            placeholder="Search"
            startAdornment={<Search />}
          />
        </ListItem>
        {items.map(({ label, icon, onClick }, index) => (
          <ListItem
            button
            key={`sidebar-item-${index}`}
            onClick={() => {
              onClick();
              dispatch(sidebarActions.toggleSidebar());
            }}
          >
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText>{label}</ListItemText>
          </ListItem>
        ))}
      </List>
    </SidebarBodyRoot>
  );
};

export default SidebarBody;
