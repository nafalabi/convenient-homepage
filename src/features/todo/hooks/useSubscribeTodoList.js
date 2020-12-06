import { useLiveQuery } from "dexie-react-hooks";
import db from "../../../app/storage/Dexie/db";

const useSubscribeTodoList = () => {
  const todoList = useLiveQuery(() => {
    return db.todo.toArray();
  }, []);

  return todoList || [];
};

export default useSubscribeTodoList;
