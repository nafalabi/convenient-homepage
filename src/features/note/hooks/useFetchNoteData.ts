import { useEffect, useState } from "react";
import AppController from "app/controller";
import NoteContentModel from "app/db/model/NoteContent";
import NoteModel from "app/db/model/Note";

/**
 * Get details of a note
 * @param noteid the id of the note
 * @returns Returns Note details on success, undefined on not found, and null when not loaded yet
 */
const useFetchNoteData = (noteid: string | null) => {
  const [noteData, setNoteData] = useState<
    (NoteContentModel & NoteModel) | null | undefined
  >(null);

  useEffect(() => {
    if (noteid !== null)
      AppController.note.fetchNoteData(noteid).then((val) => setNoteData(val));
  }, [noteid, setNoteData]);

  return noteData;
};

export default useFetchNoteData;
