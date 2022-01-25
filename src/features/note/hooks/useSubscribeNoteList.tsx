import { useLiveQuery } from "dexie-react-hooks";
import DexieAPI from "app/api/dexie-api";
import { NoteListItem } from "app/api/dexie-api/Note";

const useSubscribeNoteList = () => {
  const noteList = useLiveQuery<NoteListItem[], NoteListItem[]>(
    () => {
      return DexieAPI.note.fetchNoteList();
    },
    [],
    []
  );

  return noteList;
};

export default useSubscribeNoteList;
