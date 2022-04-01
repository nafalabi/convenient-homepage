type BookmarkEvent = chrome.events.Event<Function>;

const bookmarkEvents: (keyof typeof chrome.bookmarks)[] = [
  "onChanged",
  "onChildrenReordered",
  "onCreated",
  "onImportBegan",
  "onImportEnded",
  "onMoved",
  "onRemoved",
];

class BookmarkController {
  static getFullBookmarkTree = async (folderOnly: boolean = false) => {
    let result: chrome.bookmarks.BookmarkTreeNode[] = [];

    const [bookmarkTreeNode] = await chrome.bookmarks.getTree();

    // function to filter the node that has type of folder recursively
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

    result = folderOnly
      ? filterFolderOnly(bookmarkTreeNode.children ?? [])
      : bookmarkTreeNode.children ?? [];

    return result;
  };

  static getChildren = async (id: string) => {
    return await chrome.bookmarks.getChildren(String(id));
  };

  static getBookmarkDetails = async (
    id: string | number
  ): Promise<chrome.bookmarks.BookmarkTreeNode> => {
    return await new Promise((resolve, reject) => {
      chrome.bookmarks.get(String(id), ([bookmarkData]) => {
        resolve(bookmarkData);
      });
    });
  };

  static reorderBookmark = async (
    nodeId: string,
    targetId: string,
    targetType: "BEFORE" | "INSIDE" | "AFTER",
    targetIndex: number
  ) => {
    // if the target is the same as source, skip
    if (nodeId === targetId) return;

    const targetBookmark = await this.getBookmarkDetails(targetId);

    // Check if target is a child of source
    let isChildOfSource = false;
    let seqid = targetBookmark.parentId;
    while (true) {
      if (
        seqid === undefined ||
        seqid === "0" ||
        seqid === "1" ||
        seqid === "2" ||
        seqid === "3"
      ) {
        isChildOfSource = false;
        break;
      }
      if (seqid === nodeId) {
        isChildOfSource = true;
        break;
      }
      const parent = await this.getBookmarkDetails(seqid);
      if (parent === undefined) {
        isChildOfSource = false;
        break;
      }
      seqid = parent.parentId;
    }

    // if the target a child of source, skip
    if (isChildOfSource) return;

    let parentId = targetType === "INSIDE" ? targetId : targetBookmark.parentId;
    let index = targetType === "INSIDE" ? 0 : targetIndex;

    index += targetType === "AFTER" ? 1 : 0;

    await chrome.bookmarks.move(String(nodeId), {
      index: index,
      parentId: String(parentId),
    });
  };

  static createFolder = async (nodeId: string, title: string) => {
    const node = await chrome.bookmarks.create({
      parentId: nodeId,
      title,
    });
    return await chrome.bookmarks.move(node.id, { parentId: nodeId, index: 0 });
  };

  static createBookmark = async (
    nodeId: string,
    title: string,
    url: string
  ) => {
    return await chrome.bookmarks.create({
      parentId: nodeId,
      title,
      url,
    });
  };

  static editBookmark = async (nodeId: string, title: string, url: string) => {
    return await chrome.bookmarks.update(nodeId, { title, url });
  };

  static removeBookmark = async (nodeId: string) => {
    return await chrome.bookmarks.removeTree(nodeId);
  };

  static addEventListener = (func: Function) => {
    bookmarkEvents.forEach((event) => {
      (chrome.bookmarks[event] as BookmarkEvent).addListener(func);
    });
  };

  static removeEventListener = (func: Function) => {
    bookmarkEvents.forEach((event) => {
      (chrome.bookmarks[event] as BookmarkEvent).removeListener(func);
    });
  };
}

export default BookmarkController;
