import React, { useEffect } from "react";
import { Box, styled, Skeleton, debounce } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Editor from "rich-markdown-editor";

import useFetchNoteData from "../hooks/useFetchNoteData";
import useNoteActions from "../hooks/useNoteActions";
import { actions, HOME_NOTE, selectors } from "../slice";

import NoteCouldntLoad from "./NoteCouldntLoad";
import welcomeMessage from "./welcome-message";

import StyleOverride from "./StyleOverride";

const RootBox = styled(Box)(({ theme }) => ({}));

const NoteEditor = () => {
  const dispatch = useDispatch();
  const selectedNote = useSelector(selectors.selectedNote);
  const editable = useSelector(selectors.editable);
  const darkMode = useSelector(
    ({ settings }) => settings.generalSettings.darkMode
  );

  const { noteData, isLoading } = useFetchNoteData(String(selectedNote));
  const {
    saveContent,
    modifyContent,
    onSearchLink,
    addSubNote,
    uploadImage,
    onClickLink,
    modifiedContent,
  } = useNoteActions(noteData?.noteid);

  useEffect(() => {
    new Promise(
      debounce(() => {
        if (modifiedContent === noteData?.notecontent)
          dispatch(actions.setIsModified(false));
      }, 500)
    );
  }, [noteData?.notecontent, modifiedContent, dispatch]);

  const isHome = selectedNote === HOME_NOTE;
  if (!isLoading && !noteData && !isHome) return <NoteCouldntLoad />;

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
            onChange={modifyContent}
            onSave={saveContent}
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
    </RootBox>
  );
};

export default NoteEditor;
