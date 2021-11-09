import Dexie from "dexie";
import { IBackground } from "./Background";
import Note from "./Note";
import { INoteContent } from "./NoteContent";
import { ITask } from "./Task";
import { ITodo } from "./Todo";

export class DexieDB extends Dexie {
  background: Dexie.Table<IBackground, number>;
  note: Dexie.Table<Note, number>;
  notecontent: Dexie.Table<INoteContent, number>;
  task: Dexie.Table<ITask, number>;
  todo: Dexie.Table<ITodo, number>;

  constructor() {
    super("convenient-homepage");

    this.version(10).stores({
      todo: "++todoid",
      task: "++taskid, [todoid+completed]",
      note: "++noteid, notename, firstlevel, parentnoteid, expanded, [parentnoteid+notename], order",
      notecontent: "&noteid",
      background: "++backgroundid, downloadtime, expireat",
    });

    this.background = this.table("background");
    this.note = this.table("note");
    this.notecontent = this.table("notecontent");
    this.task = this.table("task");
    this.todo = this.table("todo");
  }
}

const dexieDB = new DexieDB();

export default dexieDB;

// for debug purpose only
declare global {
  var db: DexieDB;
}
global.db = dexieDB;
