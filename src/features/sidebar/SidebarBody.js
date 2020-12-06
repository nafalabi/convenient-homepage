import React, { useMemo } from "react";
import { useDispatch } from "react-redux";
import { actions as sidebarActions } from "./slice";
import { actions as todoActions } from "../todo/slice";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  styled,
} from "@material-ui/core";
import ListIcon from "@material-ui/icons/List";

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
    ],
    [dispatch]
  );

  return (
    <SidebarBodyRoot {...props}>
      <List>
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
