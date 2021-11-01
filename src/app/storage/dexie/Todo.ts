import Task from "./Task";
import db from "./db";

export interface ITodo {
  todoid?: number;
  name?: string;
  tasks?: Task[];
}

class Todo implements ITodo {
  todoid?: number;
  name?: string;
  tasks?: Task[];

  async save() {
    const todoid = await db.todo.put(this, this.todoid);
    this.todoid = todoid;
    return todoid;
  }
}

db.todo.mapToClass(Todo);

export default Todo;
