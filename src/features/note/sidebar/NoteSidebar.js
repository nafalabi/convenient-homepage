import { Box } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import useFetchNoteList from "../hooks/useFetchNoteList";
import { actions, selectors } from "../slice";
import InputWithConfirmation from "components/InputWithConfirmation";
import useFetchExpandedNoteIds from "../hooks/useFetchExpandedNoteIds";
import NoteSidebarContextMenu from "./NoteSidebarContextMenu";
import useContextMenu from "../hooks/useContextMenu";
import TreeViewDnd from "components/TreeViewDnd";
import DexieAPI from "app/api/dexie-api";

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
    DexieAPI.note.toggleExpandNote(expandedNoteIds, ids);
    setExpandedNoteIds(ids);
    setTimeout(() => dispatch(actions.refreshTreeList()), 500);
  };

  const selectNode = (e, id) => {
    !e.target.closest(".MuiTreeItem-iconContainer") &&
      dispatch(actions.selectNote(parseInt(id)));
  };

  const addNewNote = async (notename) => {
    await DexieAPI.note.addNewNote(notename);
    dispatch(actions.refreshTreeList());
  };

  const onNodeDrop = async (id, targetId, targetType, targetIndex) => {
    await DexieAPI.note.reorderNote(id, targetId, targetType, targetIndex);
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
        onNodeDrop={onNodeDrop}
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
