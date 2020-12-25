import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PanelWithSidebar from "../../components/PanelWithSidebar";
import NoteMain from "./NoteMain";
import NoteSidebar from "./NoteSidebar";
import { actions, selectors } from "./slice";

const Note = () => {
  const isOpen = useSelector(selectors.isOpen);
  const dispatch = useDispatch();

  return (
    <PanelWithSidebar
      open={isOpen}
      toggle={() => dispatch(actions.toggleNote())}
      title="Note"
      SidebarComponent={({ dialogRef }) => (
        <NoteSidebar dialogRef={dialogRef} />
      )}
      ContentComponent={({ dialogRef }) => <NoteMain dialogRef={dialogRef} />}
    />
  );
};

export default Note;
