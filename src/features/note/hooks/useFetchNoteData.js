import { useEffect, useState } from "react";
import db from "../../../app/storage/dexie/db";

const useFetchNoteData = (noteid) => {
  const [noteData, setNoteData] = useState(null);
  useEffect(() => {
    if (noteid !== null)
      db.note
        .where({ noteid: parseInt(noteid) })
        .first()
        .then(async (data) => {
          const noteContent = await db.notecontent
            .where({ noteid: parseInt(data.noteid) })
            .first();
          data.notecontent = noteContent.notecontent;
          setNoteData(data);
        });
  }, [noteid, setNoteData]);

  return noteData;
};

export default useFetchNoteData;
