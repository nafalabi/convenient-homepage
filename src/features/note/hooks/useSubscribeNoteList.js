import { useLiveQuery } from "dexie-react-hooks";
import db from "../../../app/storage/dexie/db";

const useSubscribeNoteList = () => {
  const noteList = useLiveQuery(() => {
    return db.note.toArray();
  }, []);

  return noteList || [];
};

export default useSubscribeNoteList;
