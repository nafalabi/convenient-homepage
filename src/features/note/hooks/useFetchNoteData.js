import { useEffect, useState } from "react";
import { db } from "../../../app/storage/Dexie";

const useFetchNoteData = (noteid) => {
  const [noteData, setNoteData] = useState(null);
  useEffect(() => {
    setNoteData(null);
    db.note
      .where({ noteid })
      .first()
      .then((data) => setNoteData(data));
  }, [noteid, setNoteData]);

  return noteData;
};

export default useFetchNoteData;
