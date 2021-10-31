import { Box } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import React from "react";
import { useSelector } from "react-redux";
import { selectors } from "../slice";
import Editor from "rich-markdown-editor";
import useNoteActions from "../hooks/useNoteActions";

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
});

const welcomeMessage = `# Welcome\n
Organize everything in one place.\n
This is the homepage, you can edit this page try anything here.\n
But all changes will be discarded once you change page.\n
Have fun!\n
\\
\\`;

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
