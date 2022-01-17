import { Box } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import React from "react";
import { useSelector } from "react-redux";
import { selectors } from "../slice";
import Editor from "rich-markdown-editor";
import useNoteActions from "../hooks/useNoteActions";
import styleOverride from "./style-override";
import welcomeMessage from "./welcome-message";

const useStyles = makeStyles((theme) => ({
  ...styleOverride(theme),
}));

const NoteHome = () => {
  useStyles();
  const darkMode = useSelector(({ global }) => global.darkMode);
  const editable = useSelector(selectors.editable);
  const { onClickLink, uploadImage } = useNoteActions();

  return (
    <Box>
      <Box
        sx={{
          ml: 2,
          mb: 2,
          "& div": {
            backgroundColor: "transparent",
          },
        }}
      >
        <Editor
          defaultValue={welcomeMessage}
          onClickLink={onClickLink}
          uploadImage={uploadImage}
          autoFocus
          readOnly={!editable}
          dark={darkMode}
        />
      </Box>
    </Box>
  );
};

export default NoteHome;
