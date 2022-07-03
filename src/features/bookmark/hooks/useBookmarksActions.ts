import AppController from "app/controller";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions, selectors } from "../slice";

const useBookmarksActions = (nodeId: string) => {
  const dispatch = useDispatch();
  const selectedBookmarkId = useSelector(selectors.selectedBookmark);

  const [bookmarkDetail, setBookmarkDetail] =
    useState<chrome.bookmarks.BookmarkTreeNode | null>(null);

  useEffect(() => {
    if (nodeId)
      AppController.bookmark.getBookmarkDetails(nodeId).then((bookmark) => {
        setBookmarkDetail(bookmark);
      });
  }, [nodeId]);

  const createFolder = useCallback(
    async (title) => AppController.bookmark.createFolder(nodeId, title),
    [nodeId]
  );

  const createBookmark = useCallback(
    async (title, url) =>
      AppController.bookmark.createBookmark(nodeId, title, url),
    [nodeId]
  );

  const editBookmark = useCallback(
    async (title, url) => {
      const node = await AppController.bookmark.editBookmark(
        nodeId,
        title,
        url
      );
      setBookmarkDetail(node);
    },
    [nodeId, setBookmarkDetail]
  );

  const deleteBookmark = useCallback(async () => {
    if (selectedBookmarkId === nodeId) {
      dispatch(actions.navigateTo(bookmarkDetail?.parentId));
      setTimeout(() => AppController.bookmark.removeBookmark(nodeId), 300);
    } else {
      await AppController.bookmark.removeBookmark(nodeId);
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
