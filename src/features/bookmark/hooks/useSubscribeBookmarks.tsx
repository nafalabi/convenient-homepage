import { useEffect, useState } from "react";

const useSubscribeBookmarks = (onlyFolders = false) => {
  const [bookmarks, setBookmarks] = useState<
    chrome.bookmarks.BookmarkTreeNode[]
  >([]);

  useEffect(() => {
    // this var is merely to make easier to deal with add & remove listeners
    const chromeBookmarks: typeof chrome.bookmarks & { [key: string]: any } =
      chrome.bookmarks;

    // main action
    const getBookmarks = () => {
      chromeBookmarks.getTree(([bookmarkTreeRoot]) => {
        // function to filter the node to be folders only
        function filterFolderOnly(nodes?: chrome.bookmarks.BookmarkTreeNode[]) {
          let final: chrome.bookmarks.BookmarkTreeNode[] = [];
          if (!Array.isArray(nodes)) return final;

          nodes.forEach(function (node) {
            // if node is not a folder, skip
            if (node.url !== undefined) return;
            // recursively filter the children
            node.children = filterFolderOnly(node.children);
            // push filtered node
            final.push(node);
          });

          return final;
        }

        const bookmarkList = onlyFolders
          ? filterFolderOnly(bookmarkTreeRoot.children) ?? []
          : bookmarkTreeRoot.children ?? [];

        setBookmarks(bookmarkList);
      });
    };

    // Execute on component mount
    getBookmarks();

    // list of event to be listen to
    const events = [
      "onChanged",
      "onChildrenReordered",
      "onCreated",
      "onImportBegan",
      "onImportEnded",
      "onMoved",
      "onRemoved",
    ];

    // set listener to each events
    events.forEach((event) => {
      if (chromeBookmarks.hasOwnProperty(event))
        chromeBookmarks[event].addListener(getBookmarks);
    });

    // Cleanup listener
    return () =>
      events.forEach((event) =>
        chromeBookmarks[event].removeListener(getBookmarks)
      );
  }, [onlyFolders]);

  return bookmarks;
};

export default useSubscribeBookmarks;
