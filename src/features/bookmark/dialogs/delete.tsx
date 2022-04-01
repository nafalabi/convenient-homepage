import React from "react";
import {
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { Bookmark } from "@mui/icons-material";

export interface DialogDeleteBookmarkProps {
  action: () => void;
  handleClose: () => void;
  bookmarkDetail: chrome.bookmarks.BookmarkTreeNode | null;
}

const DialogDeleteBookmark = ({
  action,
  handleClose,
  bookmarkDetail,
}: DialogDeleteBookmarkProps) => {
  const bookmarkDomain = bookmarkDetail?.url
    ? new URL(bookmarkDetail?.url).hostname
    : "";
  const favIcon = bookmarkDomain ? (
    <img
      src={`https://www.google.com/s2/favicons?domain=${bookmarkDomain}`}
      alt="favicon"
      style={{ height: "100%", width: "auto" }}
    />
  ) : (
    <Bookmark />
  );

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        action();
        handleClose();
      }}
    >
      <DialogTitle>Delete Bookmark</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure to delete this bookmark?
        </DialogContentText>
        <DialogContentText>
          {favIcon} {bookmarkDetail?.title}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" type="submit">
          Delete
        </Button>
      </DialogActions>
    </form>
  );
};

export default DialogDeleteBookmark;
