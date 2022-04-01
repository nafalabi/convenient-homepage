import AppController from "app/controller";
import { useCallback, useEffect, useState } from "react";

const useSubscribeOneLevelBookmarks = (id: string | number) => {
  const [bookmarks, setBookmarks] = useState<
    chrome.bookmarks.BookmarkTreeNode[]
  >([]);

  const getBookmarks = useCallback(async () => {
    const nodes = await AppController.bookmark.getChildren(String(id));
    setBookmarks(nodes);
  }, [id, setBookmarks]);

  useEffect(() => {
    getBookmarks();
    AppController.bookmark.addEventListener(getBookmarks);
    return () => AppController.bookmark.removeEventListener(getBookmarks);
  }, [getBookmarks]);

  return bookmarks;
};

export default useSubscribeOneLevelBookmarks;
