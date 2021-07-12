/* global chrome */
import { useCallback, useEffect, useState } from "react";

const useBookmarksActions = (nodeId = null) => {
  const [bookmarkDetail, setBookmarkDetail] = useState({});
  useEffect(() => {
    if (nodeId)
      chrome.bookmarks.get(nodeId, ([bookmark]) => {
        setBookmarkDetail(bookmark);
      });
  }, [nodeId]);

  const createFolder = useCallback(
    async (title) =>
      await chrome.bookmarks.create({
        parentId: nodeId,
        title,
      }),
    [nodeId]
  );
  const createBookmark = useCallback(
    async (title, url) =>
      await chrome.bookmarks.create({
        parentId: nodeId,
        title,
        url,
      }),
    [nodeId]
  );
  const editBookmark = useCallback(
    async (title, url) => {
      await chrome.bookmarks.update(nodeId, { title, url });
      setBookmarkDetail({ ...bookmarkDetail, title, url });
    },
    [nodeId, setBookmarkDetail, bookmarkDetail]
  );
  const deleteBookmark = useCallback(
    async () => chrome.bookmarks.removeTree(nodeId),
    [nodeId]
  );

  return {
    bookmarkDetail,
    createFolder,
    createBookmark,
    editBookmark,
    deleteBookmark,
  };
};

export default useBookmarksActions;
