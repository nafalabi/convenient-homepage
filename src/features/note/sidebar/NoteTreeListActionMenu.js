import { Box, Menu, MenuItem, Typography } from "@material-ui/core";
import { Add, Delete } from "@material-ui/icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { db, Note } from "../../../app/storage/Dexie";
import { actions, selectors } from "../slice";

const NoteTreeListActionMenu = () => {
  const dispatch = useDispatch();
  const noteIdOfOpenedActionMenu = useSelector(
    selectors.noteIdOfOpenedActionMenu
  );
  const deleteNote = () => {
    db.note.where("parentnoteid").equals(noteIdOfOpenedActionMenu).delete();
    db.note.delete(noteIdOfOpenedActionMenu);
    dispatch(actions.closeNoteListActionMenu());
    dispatch(actions.refreshTreeList());
  };
  const addSubNote = async () => {
    // determining sub note name
    const defaultNoteName = "sub note";
    let index = 0;
    let notename = "";
    while (true) {
      notename = defaultNoteName;
      if (index > 0) notename = notename + " " + index;
      if (
        (await db.note
          .where(["parentnoteid", "notename"])
          .equals([noteIdOfOpenedActionMenu, notename])
          .count()) === 0
      ) {
        break;
      }
      index++;
    }

    const newNote = new Note();
    newNote.notename = notename;
    newNote.firstlevel = 0;
    newNote.parentnoteid = noteIdOfOpenedActionMenu;
    newNote
      .save()
      .catch((e) => {
        console.log(e);
      })
      .then((a) => {
        dispatch(actions.refreshTreeList());
      });
    dispatch(actions.closeNoteListActionMenu());
  };

  return (
    <Menu
      id="note-list-action-menu"
      anchorEl={() =>
        document.getElementById("list-action-" + noteIdOfOpenedActionMenu)
      }
      keepMounted
      open={Boolean(noteIdOfOpenedActionMenu)}
      onClose={() => dispatch(actions.closeNoteListActionMenu())}
    >
      <MenuItem onClick={addSubNote}>
        <Box mr={1} display="inline-flex">
          <Add />
        </Box>
        <Typography variant="body2">Add a sub note</Typography>
      </MenuItem>
      <MenuItem onClick={deleteNote}>
        <Box mr={1} display="inline-flex">
          <Delete />
        </Box>
        <Typography variant="body2">Delete</Typography>
      </MenuItem>
    </Menu>
  );
};

export default NoteTreeListActionMenu;
