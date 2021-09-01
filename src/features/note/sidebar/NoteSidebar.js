import { Box, LinearProgress } from "@material-ui/core";
import { ChevronRight, ExpandMore, Subject } from "@material-ui/icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import useFetchNoteList from "../hooks/useFetchNoteList";
import { actions, selectors } from "../slice";
import InputWithConfirmation from "../../../components/InputWithConfirmation";
import { db, Note } from "../../../app/storage/Dexie";
import { TreeView } from "@material-ui/lab";
import useFetchExpandedNoteIds from "../hooks/useFetchExpandedNoteIds";
import NoteTreeListItem from "./NoteTreeListItem";
import NoteSidebarContextMenu from "./NoteSidebarContextMenu";
import useContextMenu from "../hooks/useContextMenu";

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

  const selectNode = (e, id) =>
    !e.target.closest(".MuiTreeItem-iconContainer") &&
    dispatch(actions.selectNote(parseInt(id)));

  const mapList = (arrayList) => {
    return arrayList.map((note) => {
      return (
        <NoteTreeListItem
          key={note.noteid}
          nodeId={String(note.noteid)}
          labelText={note.notename}
          labelIcon={Subject}
          totalChildren={note.totalChildren}
        >
          {note.children && mapList(note.children)}
          {!note.expanded && <LinearProgress />}
        </NoteTreeListItem>
      );
    });
  };

  return (
    <Box pb={4} onContextMenu={onContextMenu}>
      <TreeView
        defaultCollapseIcon={<ExpandMore />}
        defaultExpandIcon={<ChevronRight />}
        expanded={expandedNoteIds}
        selected={String(selectedNote)}
        onNodeToggle={toggleExpandNode}
        onNodeSelect={selectNode}
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

      <NoteSidebarContextMenu
        handleClose={handleCloseContextMenu}
        clickPosition={clickPosition}
        clickedNodeId={clickedNodeId}
      />
    </Box>
  );
};

export default Sidebar;
