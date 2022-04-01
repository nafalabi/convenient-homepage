import AppController from "app/controller";
import { useCallback, useEffect, useState } from "react";

const useSubscribeBookmarks = (folderOnly = false) => {
  const [bookmarks, setBookmarks] = useState<
    chrome.bookmarks.BookmarkTreeNode[]
  >([]);

  const getBookmarks = useCallback(async () => {
    const nodes = await AppController.bookmark.getFullBookmarkTree(folderOnly);
    setBookmarks(nodes);
  }, [folderOnly, setBookmarks]);

  useEffect(() => {
    getBookmarks();
    AppController.bookmark.addEventListener(getBookmarks);
    return () => AppController.bookmark.removeEventListener(getBookmarks);
  }, [getBookmarks]);

  return bookmarks;
};

export default useSubscribeBookmarks;
