import { useEffect, useState } from "react";
import DexieAPI from "app/api/dexie-api";
import { NoteListItem } from "app/api/dexie-api/Note";

const useFetchNoteList = (refreshReference = 0) => {
  const [noteList, setNoteList] = useState<NoteListItem[]>([]);

  useEffect(() => {
    DexieAPI.note
      .fetchNoteList()
      .then((newNoteList) => setNoteList(newNoteList));
  }, [refreshReference]);

  return noteList;
};

export default useFetchNoteList;
