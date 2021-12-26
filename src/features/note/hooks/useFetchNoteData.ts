import { useEffect, useState } from "react";
import DexieAPI from "app/api/dexie-api";
import NoteContent from "app/storage/dexie/NoteContent";
import Note from "app/storage/dexie/Note";

/**
 * Get details of a note
 * @param noteid the id of the note
 * @returns Returns Note details on success, undefined on not found, and null when not loaded yet
 */
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
