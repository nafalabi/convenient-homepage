import { useEffect, useState } from "react";
import db from "../../../app/storage/dexie/db";

const useFetchNoteList = (refreshReference = 0) => {
  const [noteList, setNoteList] = useState(null);
  useEffect(() => {
    const map = (coll) => {
      var result = [];
      return coll
        .each(async (row) => {
          delete row.notecontent;

          // calculating total children of the current note / page
          row.totalChildren = await db.note
            .where("parentnoteid")
            .equals(row.noteid)
            .count();

          // if the page / note is expanded, then fetch also its children
          if (row.expanded && row.totalChildren) {
            const children = await map(
              db.note.where("parentnoteid").equals(row.noteid)
            );
            row.children = children;
          }

          result.push(row);
        })
        .then(() =>
          result.sort((a, b) => a.notename.localeCompare(b.notename))
        );
    };
    map(db.note.where("firstlevel").equals(1)).then((data) =>
      setNoteList(data)
    );
  }, [refreshReference]);

  return noteList || [];
};

export default useFetchNoteList;
