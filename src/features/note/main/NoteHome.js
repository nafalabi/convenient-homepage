import { Box } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import React from "react";
import { useSelector } from "react-redux";
import { selectors } from "../slice";
import Editor from "rich-markdown-editor";
import useNoteActions from "../hooks/useNoteActions";
import styleOverride from "./style-override";
import welcomeMessage from "./welcome-message";

const useStyles = makeStyles({
  ...styleOverride,
});

const NoteHome = () => {
  useStyles();
  const editable = useSelector(selectors.editable);
  const { onClickLink, uploadImage } = useNoteActions();

  return (
    <Box>
      <Box ml={2} mb={2}>
        <Editor
          defaultValue={welcomeMessage}
          onClickLink={onClickLink}
          uploadImage={uploadImage}
          autoFocus
          readOnly={!editable}
        />
      </Box>
    </Box>
  );
};

export default NoteHome;
