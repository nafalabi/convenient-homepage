import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../../app/storage/Dexie";

const useSubscribeTaskList = ({ todoid }) => {
  const queryResult = useLiveQuery(async () => {
    if (todoid) {
      const todo = await db.todo.where({ todoid }).first();
      const tasks = await db.task.where({ todoid, completed: 0 }).toArray();
      // const tasks = [];
      if (todo && tasks) return { todo, tasks };
    }
  }, [todoid]);

  return queryResult;
};

export default useSubscribeTaskList;
