/* global chrome */
export const getBookmarkDetails = async (id) => {
  return await new Promise((resolve, reject) => {
    chrome.bookmarks.get(String(id), ([bookmarkData]) => {
      resolve(bookmarkData);
    });
  });
};

export const reorderBookmark = async (
  nodeId,
  targetId,
  targetType,
  targetIndex
) => {
  // if the target is the same as source, skip
  if (nodeId === targetId) return;

  const targetBookmark = await getBookmarkDetails(targetId);

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
    const parent = await getBookmarkDetails(seqid);
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
