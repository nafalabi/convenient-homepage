import { Box } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions, selectors } from "../slice";
import InputWithConfirmation from "components/InputWithConfirmation";
import useFetchExpandedNoteIds from "../hooks/useFetchExpandedNoteIds";
import NoteSidebarContextMenu from "./NoteSidebarContextMenu";
import useContextMenu from "../hooks/useContextMenu";
import TreeViewDnd from "components/TreeViewDnd";
import InternalAPI from "app/api/internal-api";
import { TreeViewProps } from "components/TreeViewDnd/types";
import { NoteListItem } from "app/api/internal-api/Note";
import { IconType } from "constant";
import useSubscribeNoteList from "../hooks/useSubscribeNoteList";

const Sidebar = () => {
  const selectedNote = useSelector(selectors.selectedNote);
  const { expandedNoteIds, setExpandedNoteIds } = useFetchExpandedNoteIds();
  const noteList = useSubscribeNoteList();
  const dispatch = useDispatch();

  const {
    clickPosition,
    clickedNodeId,
    handleCloseContextMenu,
    onContextMenu,
  } = useContextMenu(false);

  const toggleExpandNode: TreeViewProps<NoteListItem>["onNodeToggle"] = async (
    e,
    ids
  ) => {
    if (!(e.target as HTMLElement).closest(".MuiTreeItem-iconContainer"))
      return;
    setExpandedNoteIds(ids);
    setTimeout(() => InternalAPI.note.toggleExpandNote(expandedNoteIds, ids), 500);
  };

  const selectNode: TreeViewProps<NoteListItem>["onNodeSelect"] = (e, id) => {
    !(e.target as HTMLElement).closest(".MuiTreeItem-iconContainer") &&
      dispatch(actions.selectNote(parseInt(id)));
  };

  const addNewNote = async (notename: string) => {
    await InternalAPI.note.addNewNote(notename);
  };

  const onNodeDrop: TreeViewProps<NoteListItem>["onNodeDrop"] = async (
    id,
    targetId,
    targetType,
    targetIndex
  ) => {
    await InternalAPI.note.reorderNote(id, targetId, targetType, targetIndex);
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
        resolveData={(data) => ({
          id: data.noteid ?? 0,
          label: data.notename ?? "",
          iconId: data.iconId ?? "Subject",
          iconType: data.iconType ?? IconType.MATERIAL_ICON,
          hasChildren: Boolean(data.totalChildren),
          children: data.children,
          expanding: (data.totalChildren ?? 0) > 0 && !data.children,
        })}
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
