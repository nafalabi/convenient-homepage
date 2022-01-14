import { Box, Typography } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { Skeleton } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import Editor from "rich-markdown-editor";
import useFetchNoteData from "../hooks/useFetchNoteData";
import useNoteActions from "../hooks/useNoteActions";
import { selectors } from "../slice";
import NoteCouldntLoad from "./NoteCouldntLoad";
import styleOverride from "./style-override";

const useStyles = makeStyles((theme) => ({
  ...styleOverride,
  statusBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTop: "1px solid gainsboro",
    color: "#555",
    background: theme.palette.background.default,
    display: "flex",
    flexDirection: "row-reverse",
    "&>*": {
      padding: "4px 12px",
      borderLeft: "1px solid gainsboro",
    },
  },
}));

const NoteEditor = ({ selectedNote }) => {
  const classes = useStyles();
  const editable = useSelector(selectors.editable);
  const noteData = useFetchNoteData(selectedNote);
  const {
    updateNoteContent,
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
            onChange={updateNoteContent}
            onSearchLink={onSearchLink}
            onCreateLink={addSubNote}
            onClickLink={onClickLink}
            uploadImage={uploadImage}
            autoFocus
            readOnly={!editable}
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
