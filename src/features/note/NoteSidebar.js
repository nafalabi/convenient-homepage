import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { Notes } from "@material-ui/icons";
import React from "react";
import { useDispatch } from "react-redux";
import useSubscribeNoteList from "./hooks/useSubscribeNoteList";
import { actions } from "./slice";

const Sidebar = () => {
  const noteList = useSubscribeNoteList();
  const dispatch = useDispatch();

  return (
    <Box>
      <List>
        {noteList.map((noteItem) => {
          return (
            <ListItem
              button
              dense
              key={noteItem.noteid}
              onClick={() => dispatch(actions.selectNote(noteItem.noteid))}
            >
              <ListItemIcon>
                <Notes />
              </ListItemIcon>
              <ListItemText>{noteItem.notename}</ListItemText>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

export default Sidebar;
