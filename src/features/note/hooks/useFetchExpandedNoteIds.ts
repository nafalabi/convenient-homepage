import { useEffect, useState } from "react";
import DexieAPI from "app/api/dexie-api";

const useFetchExpandedNoteIds = () => {
  const [expandedNoteIds, setExpandedNoteIds] = useState<string[]>([]);
  useEffect(() => {
    DexieAPI.note.fetchExpandedNoteIds().then((val) => setExpandedNoteIds(val));
  }, []);

  return [expandedNoteIds, setExpandedNoteIds];
};

export default useFetchExpandedNoteIds;
