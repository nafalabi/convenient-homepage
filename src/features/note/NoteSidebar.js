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
import InputWithConfirmation from "../../components/InputWithConfirmation";
import { Note } from "../../app/storage/Dexie";

const Sidebar = () => {
  const noteList = useSubscribeNoteList();
  const dispatch = useDispatch();

  return (
    <Box>
      <List dense>
        {noteList.map((noteItem) => {
          return (
            <ListItem
              button
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
        <ListItem>
          <InputWithConfirmation
            onConfirm={(value) => {
              const newNote = new Note();
              newNote.notename = value;
              newNote.save();
            }}
            inputProps={{ style: { fontSize: 13 } }}
            placeholder="Add New Note"
          />
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
