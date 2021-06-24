/* global chrome */
import { useEffect, useState } from "react";

const useSubscribeBookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const chromeBookmarks = chrome.bookmarks;
    const getBookmarks = () => {
      chromeBookmarks.getTree(([bookmarkTreeRoot]) => {
        setBookmarks(bookmarkTreeRoot.children);
      });
    };
		// Execute on component mount
		getBookmarks();

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
  }, []);

  return bookmarks;
};

export default useSubscribeBookmarks;
