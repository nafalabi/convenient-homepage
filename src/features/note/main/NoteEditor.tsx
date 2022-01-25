import React from "react";
import { Box, styled, Typography, Skeleton } from "@mui/material";
import { useSelector } from "react-redux";
import Editor from "rich-markdown-editor";

import useFetchNoteData from "../hooks/useFetchNoteData";
import useNoteActions from "../hooks/useNoteActions";
import { NOTE_HOME, selectors } from "../slice";

import NoteCouldntLoad from "./NoteCouldntLoad";
import welcomeMessage from "./welcome-message";

import StyleOverride from "./StyleOverride";

const RootBox = styled(Box)(({ theme }) => ({
  "& .status-bar": {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTop: `1px solid ${theme.palette.divider}`,
    color: "#555",
    background: theme.palette.background.default,
    display: "flex",
    flexDirection: "row-reverse",
    "&>*": {
      padding: "4px 12px",
      borderLeft: `1px solid ${theme.palette.divider}`,
    },
  },
}));

const NoteEditor = () => {
  const selectedNote = useSelector(selectors.selectedNote);
  const editable = useSelector(selectors.editable);
  const darkMode = useSelector(
    ({ settings }) => settings.generalSettings.darkMode
  );

  const noteData = useFetchNoteData(String(selectedNote));
  const {
    updateNoteContent,
    onSearchLink,
    addSubNote,
    uploadImage,
    touched,
    isSaving,
    onClickLink,
  } = useNoteActions(noteData?.noteid);

  const isHome = selectedNote === NOTE_HOME;
  const isLoading = noteData === null;

  if (noteData === undefined && !isHome) return <NoteCouldntLoad />;

  return (
    <RootBox ml={1} onKeyDown={(e) => e.stopPropagation()}>
      <StyleOverride />
      <Box
        sx={{
          ml: 1,
          mb: 2,
          "& div": {
            backgroundColor: "transparent",
          },
        }}
      >
        {isLoading && (
          <>
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </>
        )}
        {noteData && !isLoading && (
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
            dark={darkMode}
          />
        )}
        {isHome && (
          <Editor
            defaultValue={welcomeMessage}
            onClickLink={onClickLink}
            uploadImage={uploadImage}
            autoFocus
            readOnly={!editable}
            dark={darkMode}
          />
        )}
      </Box>

      {!isHome && (
        <div className="status-bar">
          {!touched && <Typography variant="body2">Ready</Typography>}
          {touched && isSaving && (
            <Typography variant="body2">Saving...</Typography>
          )}
          {touched && !isSaving && (
            <Typography variant="body2">Changes saved</Typography>
          )}
        </div>
      )}
    </RootBox>
  );
};

export default NoteEditor;
