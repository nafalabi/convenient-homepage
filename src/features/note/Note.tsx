import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PanelWithSidebar from "components/PanelWithSidebar";
import NoteMain from "./main/NoteMain";
import NoteSidebar from "./sidebar/NoteSidebar";
import { actions, HOME_NOTE, selectors } from "./slice";
import NoteToolbar from "./toolbar/NoteToolbar";
import useModalRouteAction from "hooks/useModalRouteAction";
import { useSearchParams } from "react-router-dom";

const Note = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectors.isOpen);
  const [params] = useSearchParams();

  const { handleClose } = useModalRouteAction({
    open: () => dispatch(actions.setOpen(true)),
    close: () => dispatch(actions.setOpen(false)),
  });

  useEffect(() => {
    let noteid = params.get("noteid") ?? HOME_NOTE;
    dispatch(actions.selectNote(Number(noteid)));
  }, [dispatch, params]);

  return (
    <PanelWithSidebar
      open={isOpen}
      onClose={handleClose}
      title="Note"
      ToolbarItemComponent={NoteToolbar}
      SidebarComponent={NoteSidebar}
      ContentComponent={NoteMain}
    />
  );
};

export default Note;
