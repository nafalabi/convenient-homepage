import { Box, Divider, makeStyles, TextField } from "@material-ui/core";
import React from "react";
import Editor from "rich-markdown-editor";
import useDebouncedCallback from "../../hooks/useDebounceCallback";
import useSubscribeNote from "./hooks/useSubscribeNote";

const useStyles = makeStyles({
  "@global": {
    "#block-menu-container": {
      // The popover of "+" button for rich markdown editor
      zIndex: 2000, // need to bring up otherwise will be blocked by the note panel/modal
    },
  },
});

const NoteEditor = ({ selectedNote }) => {
  useStyles();
  const noteData = useSubscribeNote(selectedNote);

  const updateNoteName = (e) => {
    const { value } = e.target;
    if (!value) return;
    noteData.notename = value;
    noteData.save();
  };

  const updateNoteData = useDebouncedCallback((getData) => {
    const data = getData();
    noteData.notecontent = data;
    noteData.save();
  }, 1000);

  return (
    <Box ml={1} onKeyDown={(e) => e.stopPropagation()}>
      <Box mb={2} ml={1}>
        <TextField
          fullWidth
          label="Note Name"
          defaultValue={noteData.notename}
          key={noteData.notename}
          onBlur={updateNoteName}
          onKeyDown={(e) => {
            e.stopPropagation();
            switch (e.key) {
              case "Enter":
                updateNoteName(e);
                break;
              case "Escape":
                e.target.value = noteData.notename;
                e.target.blur();
                break;
              default:
                break;
            }
          }}
        />
      </Box>

      <Box mb={1} ml={-4} mr={-3}>
        <Divider />
      </Box>

      <Box ml={1}>
        <Editor
          defaultValue={noteData.notecontent}
          key={noteData.notecontent}
          onChange={updateNoteData}
          handleDOMEvents={
            {
              // focus: () => console.log("FOCUS"),
              // blur: () => console.log("BLUR"),
              // paste: () => console.log("PASTE"),
              // touchstart: () => console.log("TOUCH START"),
            }
          }
          autoFocus
        />
      </Box>
    </Box>
  );
};

export default NoteEditor;
