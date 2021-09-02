import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PanelWithSidebar from "../../components/PanelWithSidebar";
import NoteMain from "./main/NoteMain";
import NoteSidebar from "./sidebar/NoteSidebar";
import { actions, selectors } from "./slice";
import NoteToolbar from "./toolbar/NoteToolbar";

const Note = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectors.isOpen);

  return (
    <PanelWithSidebar
      open={isOpen}
      toggle={() => dispatch(actions.toggleNote())}
      title="Note"
      ToolbarItemComponent={({ dialogRef }) => (
        <NoteToolbar dialogRef={dialogRef} />
      )}
      SidebarComponent={({ dialogRef }) => (
        <NoteSidebar dialogRef={dialogRef} />
      )}
      ContentComponent={({ dialogRef }) => <NoteMain dialogRef={dialogRef} />}
    />
  );
};

export default Note;
