import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../../app/storage/Dexie";

const useSubscribeNote = (noteid) => {
  const note = useLiveQuery(() => {
    return db.note.where({ noteid }).first();
  }, [noteid]);

  return note || {};
};

export default useSubscribeNote;
