import { Box, LinearProgress } from "@material-ui/core";
import { ChevronRight, ExpandMore, Notes } from "@material-ui/icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import useFetchNoteList from "./hooks/useFetchNoteList";
import { actions, selectors } from "./slice";
import InputWithConfirmation from "../../components/InputWithConfirmation";
import { db, Note } from "../../app/storage/Dexie";
import { TreeView } from "@material-ui/lab";
import useFetchExpandedNoteIds from "./hooks/useFetchExpandedNoteIds";
import NoteTreeListItem from "./NoteTreeListItem";

const Sidebar = () => {
  const treeListRefreshReference = useSelector(
    selectors.treeListRefreshReference
  );
  const [expandedNoteIds, setExpandedNoteIds] = useFetchExpandedNoteIds();
  const noteList = useFetchNoteList(treeListRefreshReference);
  const dispatch = useDispatch();

  const toggleExpandNode = (e, ids) => {
    if (!e.target.closest(".MuiTreeItem-iconContainer")) return;
    const idToBeExpanded = ids.find((id) => !expandedNoteIds.includes(id));
    const idToBeShrinked = expandedNoteIds.find((id) => !ids.includes(id));
    if (idToBeExpanded) {
      db.note
        .update(parseInt(idToBeExpanded), { expanded: 1 })
        .then((a) => console.log(a));
    }
    if (idToBeShrinked) {
      db.note
        .update(parseInt(idToBeShrinked), { expanded: 0 })
        .then((a) => console.log(a));
    }
    setExpandedNoteIds(ids);
    dispatch(actions.refreshTreeList());
  };

  const mapList = (arrayList) => {
    return arrayList.map((note) => {
      if (note.totalChildren > 0) {
        return (
          <NoteTreeListItem
            key={note.noteid}
            nodeId={String(note.noteid)}
            labelText={note.notename}
            labelIcon={Notes}
          >
            {note.children && mapList(note.children)}
            {!note.expanded && <LinearProgress />}
          </NoteTreeListItem>
        );
      }
      return (
        <NoteTreeListItem
          key={note.noteid}
          nodeId={String(note.noteid)}
          labelText={note.notename}
          labelIcon={Notes}
        />
      );
    });
  };

  return (
    <Box>
      <TreeView
        defaultCollapseIcon={<ExpandMore />}
        defaultExpandIcon={<ChevronRight />}
        expanded={expandedNoteIds}
        onNodeToggle={toggleExpandNode}
        onNodeSelect={(e, id) => dispatch(actions.selectNote(parseInt(id)))}
      >
        {mapList(noteList)}
        <Box ml={4} mr={4}>
          <InputWithConfirmation
            onConfirm={(value) => {
              const newNote = new Note();
              newNote.notename = value;
              newNote.firstlevel = 1;
              newNote
                .save()
                .catch((e) => {
                  console.log(e);
                })
                .then((a) => {
                  dispatch(actions.refreshTreeList());
                });
            }}
            inputProps={{ style: { fontSize: 13 } }}
            placeholder="Add New Note"
          />
        </Box>
      </TreeView>
    </Box>
  );
};

export default Sidebar;
