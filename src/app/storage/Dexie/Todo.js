import db from "./db";

const TodoSchema = db.todo.defineClass({
  todoid: Number,
  name: String,
  tasks: Array,
});

class Todo extends TodoSchema {
  async save() {
    const todoid = await db.todo.put(this, this.todoid);
    this.todoid = todoid;
    return todoid;
  }
}

db.todo.mapToClass(Todo);

export default Todo;
