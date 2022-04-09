import { useEffect, useState } from "react";
import AppController from "app/controller";
import NoteContentModel from "app/db/model/NoteContent";
import NoteModel from "app/db/model/Note";

/**
 * Get details of a note
 * @param noteid the id of the note
 */
const useFetchNoteData = (noteid: string | null) => {
  const [isLoading, setLoading] = useState(true);
  const [noteData, setNoteData] = useState<
    (NoteContentModel & NoteModel) | null | undefined
  >(null);

  useEffect(() => {
    setLoading(true);

    if (noteid !== null) {
      AppController.note.fetchNoteData(noteid).then((val) => {
        setNoteData(val);
        setLoading(false);
      });
    }
  }, [noteid]);

  return { noteData, isLoading };
};

export default useFetchNoteData;
