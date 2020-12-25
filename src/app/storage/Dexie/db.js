import Dexie from "dexie";

const db = new Dexie("convenient-homepage");

db.version(2).stores({
  todo: "++todoid",
  task: "++taskid, [todoid+completed]",
  note: "++noteid, &notename",
});

export default db;

// for debug purpose only
global.db = db;
