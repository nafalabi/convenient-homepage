import { useEffect, useState } from "react";
import AppController from "app/controller";

const useFetchExpandedNoteIds = () => {
  const [expandedNoteIds, setExpandedNoteIds] = useState<string[]>([]);

  useEffect(() => {
    AppController.note.fetchExpandedNoteIds().then((val) => setExpandedNoteIds(val));
  }, []);

  return { expandedNoteIds, setExpandedNoteIds };
};

export default useFetchExpandedNoteIds;
