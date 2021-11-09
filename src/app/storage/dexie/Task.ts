import db from "./db";

class Task {
  taskid?: number;
  todoid?: number;
  name?: string;
  completed?: 0 | 1;

  constructor(todoid: number) {
    this.todoid = todoid;
    this.name = "";
    this.completed = 0;
  }

  async save() {
    const taskid = await db.task.put(this, this.taskid);
    this.taskid = taskid;
    return taskid;
  }

  async toggleComplete() {
    this.completed = Boolean(this.completed) ? 0 : 1;
    return this.save();
  }
}

db.task.mapToClass(Task);

export default Task;
