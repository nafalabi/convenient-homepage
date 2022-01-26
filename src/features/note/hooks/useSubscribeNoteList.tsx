import { useLiveQuery } from "dexie-react-hooks";
import InternalAPI from "app/api/internal-api";
import { NoteListItem } from "app/api/internal-api/Note";

const useSubscribeNoteList = () => {
  const noteList = useLiveQuery<NoteListItem[], NoteListItem[]>(
    () => {
      return InternalAPI.note.fetchNoteList();
    },
    [],
    []
  );

  return noteList;
};

export default useSubscribeNoteList;
