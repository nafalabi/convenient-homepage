import { Box } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions, selectors } from "../slice";
import InputWithConfirmation from "components/InputWithConfirmation";
import useFetchExpandedNoteIds from "../hooks/useFetchExpandedNoteIds";
import NoteSidebarContextMenu from "./NoteSidebarContextMenu";
import useContextMenu from "../hooks/useContextMenu";
import TreeViewDnd from "components/TreeViewDnd";
import AppController from "app/controller";
import { TreeViewProps } from "components/TreeViewDnd/types";
import { NoteListItem } from "app/controller/Note";
import { IconType } from "app/constant";
import useSubscribeNoteList from "../hooks/useSubscribeNoteList";

const Sidebar = () => {
  const selectedNote = useSelector(selectors.selectedNote);
  const isModified = useSelector(({ note }) => note.isModified);
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
    setTimeout(
      () => AppController.note.toggleExpandNote(expandedNoteIds, ids),
      500
    );
  };

  const selectNode: TreeViewProps<NoteListItem>["onNodeSelect"] = (e, id) => {
    !(e.target as HTMLElement).closest(".MuiTreeItem-iconContainer") &&
      dispatch(actions.navigateTo(Number(id) || undefined));
  };

  const addNewNote = async (notename: string) => {
    await AppController.note.addNewNote(notename);
  };

  const onNodeDrop: TreeViewProps<NoteListItem>["onNodeDrop"] = async (
    id,
    targetId,
    targetType
  ) => {
    await AppController.note.reorderNote(id, targetId, targetType);
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
        resolveData={(data) => {
          const isSelected = data.noteid === selectedNote;
          const label =
            (isSelected && isModified ? "*" : "") + (data.notename ?? "");
          return {
            id: data.noteid ?? 0,
            label,
            iconId: data.iconId ?? "Subject",
            iconType: data.iconType ?? IconType.MATERIAL_ICON,
            hasChildren: Boolean(data.totalChildren),
            children: data.children,
            expanding: (data.totalChildren ?? 0) > 0 && !data.children,
          };
        }}
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
