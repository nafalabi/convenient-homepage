import { useEffect, useState } from "react";
import DexieAPI from "../../../app/api/dexie-api";
import Note from "../../../app/storage/dexie/Note";

const useFetchNoteList = (refreshReference = 0) => {
  const [noteList, setNoteList] = useState<Note[]>([]);

  useEffect(() => {
    DexieAPI.note
      .fetchNoteList()
      .then((newNoteList) => setNoteList(newNoteList));
  }, [refreshReference]);

  return noteList;
};

export default useFetchNoteList;
