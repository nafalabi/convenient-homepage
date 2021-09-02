import React from "react";
import { useSelector } from "react-redux";
import useListenEventFromRef from "../../../hooks/useListenEventFromRef";
import NoteEditor from "./NoteEditor";
import NoteHome from "./NoteHome";
import { selectors } from "../slice";

const NoteMain = ({ dialogRef }) => {
  const selectedNote = useSelector(selectors.selectedNote);

  useListenEventFromRef("keydown", dialogRef, (e) => {
    // console.log(e);
  });

  if (!selectedNote) return <NoteHome />;

  return <NoteEditor selectedNote={selectedNote} />;
};

export default NoteMain;
