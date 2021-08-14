/* global chrome */
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions, selectors } from "../slice";

const useBookmarksActions = (nodeId = null) => {
  const dispatch = useDispatch();
  const selectedBookmarkId = useSelector(selectors.selectedBookmark);

  const [bookmarkDetail, setBookmarkDetail] = useState({});
  useEffect(() => {
    if (nodeId)
      chrome.bookmarks.get(nodeId, ([bookmark]) => {
        setBookmarkDetail(bookmark);
      });
  }, [nodeId]);

  const createFolder = useCallback(
    async (title) =>
      await chrome.bookmarks.create(
        {
          parentId: nodeId,
          title,
        },
        async (node) => {
          await chrome.bookmarks.move(node.id, { parentId: nodeId, index: 0 });
        }
      ),
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
  const deleteBookmark = useCallback(async () => {
    if (selectedBookmarkId === nodeId) {
      dispatch(actions.selectBookmark(bookmarkDetail.parentId));
      setTimeout(() => chrome.bookmarks.removeTree(nodeId), 300);
    } else {
      await chrome.bookmarks.removeTree(nodeId);
    }
  }, [nodeId, selectedBookmarkId, dispatch, bookmarkDetail]);

  return {
    bookmarkDetail,
    createFolder,
    createBookmark,
    editBookmark,
    deleteBookmark,
  };
};

export default useBookmarksActions;
