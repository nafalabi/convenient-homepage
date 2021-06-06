import {
  Box,
  Button,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import { Notes } from "@material-ui/icons";
import { useLiveQuery } from "dexie-react-hooks";
import React from "react";
import { useDispatch } from "react-redux";
import { db } from "../../app/storage/Dexie";
import { actions } from "./slice";

const useStyles = makeStyles({
  multiLineEllipsis: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    "-webkit-line-clamp": 2,
    "-webkit-box-orient": "vertical",
  },
});

const NoteHome = () => {
  const noteList =
    useLiveQuery(async () => {
      let notes = [];
      await db.note
        .where("firstlevel")
        .equals(1)
        .each((row) => {
          delete row.notecontent;
          notes.push(row);
        });
      return notes;
    }, []) || [];
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <Box>
      <Typography variant="h4">Welcome</Typography>
      <Box maxWidth="300px" lineHeight="1.5">
        <Typography variant="subtitle1">
          This is the homepage of Note
        </Typography>
        <Typography variant="body2">
          Please select one of the note to get started, or create a new one.
        </Typography>
      </Box>
      <Box mt={2}>
        <Grid container spacing={2}>
          {noteList.map((note) => (
            <Grid item key={note.noteid}>
              <Box clone width="100px" p={1} textAlign="center" display="block">
                <Paper
                  component={Button}
                  onClick={() => dispatch(actions.selectNote(note.noteid))}
                >
                  <Notes fontSize="large" />
                  <Typography
                    variant="body2"
                    className={classes.multiLineEllipsis}
                  >
                    {note.notename}
                  </Typography>
                </Paper>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default NoteHome;
