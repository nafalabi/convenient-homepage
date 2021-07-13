/* global chrome */
import { useCallback, useEffect, useState } from "react";

const useSubscribeOneLevelBookmarks = (id) => {
  const [bookmarks, setBookmarks] = useState([]);
  const chromeBookmarks = chrome.bookmarks;
  const getBookmarks = useCallback(() => {
    chromeBookmarks.getChildren(String(id), (children) => {
      setBookmarks(children);
    });
  }, [chromeBookmarks, id]);

  useEffect(() => {
    // Execute on id changed
    getBookmarks();
  }, [getBookmarks]);

  useEffect(() => {
    // Setting up event listeners
    const events = [
      "onChanged",
      "onChildrenReordered",
      "onCreated",
      "onImportBegan",
      "onImportEnded",
      "onMoved",
      "onRemoved",
    ];
    events.forEach((event) => chromeBookmarks[event].addListener(getBookmarks));
    return () =>
      events.forEach((event) =>
        chromeBookmarks[event].removeListener(getBookmarks)
      );
  }, [chromeBookmarks, getBookmarks]);

  return bookmarks;
};

export default useSubscribeOneLevelBookmarks;
