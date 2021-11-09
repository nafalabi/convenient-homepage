import { Box, LinearProgress } from "@mui/material";
import { ChevronRight, ExpandMore, Subject } from "@mui/icons-material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import useFetchNoteList from "../hooks/useFetchNoteList";
import { actions, selectors } from "../slice";
import InputWithConfirmation from "../../../components/InputWithConfirmation";
import Note from "../../../app/storage/dexie/Note";
import db from "../../../app/storage/dexie/db";
// import { TreeView } from "@mui/lab";
import useFetchExpandedNoteIds from "../hooks/useFetchExpandedNoteIds";
import NoteTreeListItem from "./NoteTreeListItem";
import NoteSidebarContextMenu from "./NoteSidebarContextMenu";
import useContextMenu from "../hooks/useContextMenu";
import NoteContent from "../../../app/storage/dexie/NoteContent";
import TreeViewDnd from "../../../components/TreeViewDnd";

const Sidebar = () => {
  const treeListRefreshRef = useSelector(selectors.treeListRefreshRef);
  const selectedNote = useSelector(selectors.selectedNote);
  const [expandedNoteIds, setExpandedNoteIds] = useFetchExpandedNoteIds();
  const noteList = useFetchNoteList(treeListRefreshRef);
  const dispatch = useDispatch();

  const {
    clickPosition,
    clickedNodeId,
    handleCloseContextMenu,
    onContextMenu,
  } = useContextMenu(false);

  const toggleExpandNode = async (e, ids) => {
    if (!e.target.closest(".MuiTreeItem-iconContainer")) return;
    const idToBeExpanded = ids.find((id) => !expandedNoteIds.includes(id));
    const idToBeShrinked = expandedNoteIds.find((id) => !ids.includes(id));
    if (idToBeExpanded) {
      db.note.update(parseInt(idToBeExpanded), { expanded: 1 });
    }
    if (idToBeShrinked) {
      db.note.update(parseInt(idToBeShrinked), { expanded: 0 });
    }
    setExpandedNoteIds(ids);
    setTimeout(() => dispatch(actions.refreshTreeList()), 500);
  };

  const selectNode = (e, id) => {
    !e.target.closest(".MuiTreeItem-iconContainer") &&
      dispatch(actions.selectNote(parseInt(id)));
  };

  const addNewNote = async (value) => {
    // Saving note
    const newNote = new Note();
    newNote.notename = value;
    newNote.firstlevel = 1;
    const noteid = await newNote.save().catch((e) => {
      console.log(e);
    });
    // Saving note content
    const newNoteContent = new NoteContent();
    newNoteContent.noteid = noteid;
    newNoteContent.notecontent = `# ${value}\n\n\n`;
    await newNoteContent.save();
    dispatch(actions.refreshTreeList());
  };

  return (
    <Box pb={4} onContextMenu={onContextMenu}>
      <TreeViewDnd
        list={noteList}
        expanded={expandedNoteIds}
        selected={String(selectedNote)}
        onNodeToggle={toggleExpandNode}
        onNodeSelect={selectNode}
      />
      <Box ml={4} mr={1} mt={1}>
        <InputWithConfirmation
          onConfirm={addNewNote}
          inputProps={{ style: { fontSize: 14 } }}
          placeholder="Add New Note"
        />
      </Box>

      <NoteSidebarContextMenu
        handleClose={handleCloseContextMenu}
        clickPosition={clickPosition}
        clickedNodeId={clickedNodeId}
      />
    </Box>
  );
};

export default Sidebar;
