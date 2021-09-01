import { Box, makeStyles, Typography } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import React from "react";
import Editor from "rich-markdown-editor";
import useFetchNoteData from "../hooks/useFetchNoteData";
import useNoteActions from "../hooks/useNoteActions";
import NoteCouldntLoad from "./NoteCouldntLoad";

const useStyles = makeStyles({
  "@global": {
    "#block-menu-container": {
      // The popover of "+" button for rich markdown editor
      zIndex: 2000, // need to bring up otherwise will be blocked by the note panel/modal
    },
    "div[offset]": {
      // similar as the above, to bring the covered element up
      zIndex: 2000,
    },
  },
  statusBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTop: "1px solid gainsboro",
    color: "#555",
    display: "flex",
    flexDirection: "row-reverse",
    "&>*": {
      padding: "4px 12px",
      borderLeft: "1px solid gainsboro",
    },
  },
});

const NoteEditor = ({ selectedNote }) => {
  const classes = useStyles();
  const noteData = useFetchNoteData(selectedNote);
  const {
    updateNoteData,
    onSearchLink,
    addSubNote,
    uploadImage,
    touched,
    isSaving,
    onClickLink,
  } = useNoteActions(noteData);

  if (noteData === undefined) return <NoteCouldntLoad />;

  return (
    <Box ml={1} onKeyDown={(e) => e.stopPropagation()}>
      <Box ml={1} mb={2}>
        {noteData ? (
          <Editor
            defaultValue={noteData.notecontent}
            key={noteData?.noteid}
            onChange={updateNoteData}
            onSearchLink={onSearchLink}
            onCreateLink={addSubNote}
            onClickLink={onClickLink}
            uploadImage={uploadImage}
            autoFocus
          />
        ) : (
          <>
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </>
        )}
      </Box>

      <div className={classes.statusBar}>
        {!touched && <Typography variant="body2">Ready</Typography>}
        {touched && isSaving && (
          <Typography variant="body2">Saving...</Typography>
        )}
        {touched && !isSaving && (
          <Typography variant="body2">Changes saved</Typography>
        )}
      </div>
    </Box>
  );
};

export default NoteEditor;
