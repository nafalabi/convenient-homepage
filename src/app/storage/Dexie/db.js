import Dexie from "dexie";

const db = new Dexie("convenient-homepage");

db.version(1).stores({
  todo: "++todoid",
  task: "++taskid, [todoid+completed]",
});

export default db;

// for debug purpose only
global.db = db;
