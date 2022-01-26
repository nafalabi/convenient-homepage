import { useEffect, useState } from "react";
import InternalAPI from "app/api/internal-api";

const useFetchExpandedNoteIds = () => {
  const [expandedNoteIds, setExpandedNoteIds] = useState<string[]>([]);

  useEffect(() => {
    InternalAPI.note.fetchExpandedNoteIds().then((val) => setExpandedNoteIds(val));
  }, []);

  return { expandedNoteIds, setExpandedNoteIds };
};

export default useFetchExpandedNoteIds;
