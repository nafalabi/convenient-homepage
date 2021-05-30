import { useEffect, useState } from "react";
import { db } from "../../../app/storage/Dexie";

const useFetchExpandedNoteIds = () => {
  const [expandedNoteIds, setExpandedNoteIds] = useState([]);
  useEffect(() => {
    db.note
      .where("expanded")
      .equals(1)
      .primaryKeys()
      .then((result) => setExpandedNoteIds(result.map((a) => String(a))));
  }, []);

  return [expandedNoteIds, setExpandedNoteIds];
};

export default useFetchExpandedNoteIds;
