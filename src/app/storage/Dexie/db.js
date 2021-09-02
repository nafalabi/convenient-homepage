import Dexie from "dexie";

const db = new Dexie("convenient-homepage");

db.version(8).stores({
  todo: "++todoid",
  task: "++taskid, [todoid+completed]",
  note: "++noteid, notename, firstlevel, parentnoteid, expanded, [parentnoteid+notename], index",
  notecontent: "&noteid",
  background: "++backgroundid, downloadtime, expireat",
});

export default db;

// for debug purpose only
global.db = db;
