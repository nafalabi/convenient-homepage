import { Box, IconButton } from "@material-ui/core";
import { Home } from "@material-ui/icons";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import PanelWithSidebar from "../../components/PanelWithSidebar";
import NoteMain from "./main/NoteMain";
import NoteSidebar from "./sidebar/NoteSidebar";
import { actions, selectors } from "./slice";

const Note = () => {
  const isOpen = useSelector(selectors.isOpen);
  const dispatch = useDispatch();

  const goToHome = useCallback(() => {
    dispatch(actions.selectNote(0));
  }, [dispatch]);

  return (
    <PanelWithSidebar
      open={isOpen}
      toggle={() => dispatch(actions.toggleNote())}
      title="Note"
      ToolbarItemComponent={({ dialogRef }) => (
        <Box marginLeft="auto">
          <IconButton color="inherit" onClick={goToHome}>
            <Home />
          </IconButton>
        </Box>
      )}
      SidebarComponent={({ dialogRef }) => (
        <NoteSidebar dialogRef={dialogRef} />
      )}
      ContentComponent={({ dialogRef }) => <NoteMain dialogRef={dialogRef} />}
    />
  );
};

export default Note;
