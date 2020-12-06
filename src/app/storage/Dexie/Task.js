import db from "./db";

const TaskSchema = db.task.defineClass({
  taskid: Number,
  todoid: Number,
  name: String,
  completed: Boolean,
});

class Task extends TaskSchema {
  constructor(todoid) {
    super();
    this.todoid = todoid;
    this.name = "";
    this.completed = Number(false);
  }

  async save() {
    const taskid = await db.task.put(this, this.taskid);
    this.taskid = taskid;
    return taskid;
  }

  async toggleComplete() {
    this.completed = Number(!Boolean(this.completed));
    return this.save();
  }
}

db.task.mapToClass(Task);

export default Task;
