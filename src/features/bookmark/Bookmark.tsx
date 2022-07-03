import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions, HOME_BOOKMARK, selectors } from "./slice";
import PanelWithSidebar from "components/PanelWithSidebar";
import BookmarkSidebar from "./sidebar/BookmarkSidebar";
import BookmarkMain from "./main/BookmarkMain";
import BookmarkToolbar from "./toolbar/BookmarkToolbar";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import useModalRouteAction from "hooks/useModalRouteAction";
import { useSearchParams } from "react-router-dom";

const Bookmark = () => {
  const isOpen = useSelector(selectors.isOpen);
  const dispatch = useDispatch();
  const [params] = useSearchParams();

  const { handleClose } = useModalRouteAction({
    open: () => dispatch(actions.setOpen(true)),
    close: () => dispatch(actions.setOpen(false)),
  });

  useEffect(() => {
    const id = params.get("bookmarkid");
    dispatch(actions.selectBookmark(id || HOME_BOOKMARK));
  }, [params, dispatch]);

  return (
    <DndProvider backend={HTML5Backend} context={window}>
      <PanelWithSidebar
        open={isOpen}
        onClose={handleClose}
        title="Bookmarks"
        ToolbarItemComponent={BookmarkToolbar}
        SidebarComponent={BookmarkSidebar}
        ContentComponent={BookmarkMain}
      />
    </DndProvider>
  );
};

export default Bookmark;
