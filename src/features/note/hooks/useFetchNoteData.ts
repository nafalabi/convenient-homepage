import { useEffect, useState } from "react";
import DexieAPI from "../../../app/api/dexie-api";
import NoteContent from "../../../app/storage/dexie/NoteContent";
import Note from "../../../app/storage/dexie/Note";

const useFetchNoteData = (noteid: string) => {
  const [noteData, setNoteData] = useState<
    (NoteContent & Note) | null | undefined
  >(null);

  useEffect(() => {
    if (noteid !== null)
      DexieAPI.note.fetchNoteData(noteid).then((val) => setNoteData(val));
  }, [noteid, setNoteData]);

  return noteData;
};

export default useFetchNoteData;
