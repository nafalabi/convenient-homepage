/* global chrome */
export const getBookmarkDetails = async (id) => {
  return await new Promise((resolve, reject) => {
    chrome.bookmarks.get(String(id), ([bookmarkData]) => {
      resolve(bookmarkData);
    });
  });
};
