import { useLiveQuery } from "dexie-react-hooks";
import AppController from "app/controller";
import { NoteListItem } from "app/controller/Note";

const useSubscribeNoteList = () => {
  const noteList = useLiveQuery<NoteListItem[], NoteListItem[]>(
    () => {
      return AppController.note.fetchNoteList();
    },
    [],
    []
  );

  return noteList;
};

export default useSubscribeNoteList;
