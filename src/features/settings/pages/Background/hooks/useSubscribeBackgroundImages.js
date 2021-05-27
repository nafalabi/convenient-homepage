import { useLiveQuery } from "dexie-react-hooks";
import db from "../../../../../app/storage/Dexie/db";

const useSubscribeBackgroundImages = (showingCount, currentPage) => {
  const queryResult = useLiveQuery(async () => {
    const total = await db.background.toCollection().count();
    const images = await db.background
      .orderBy("downloadtime")
      .reverse()
      .offset(currentPage * showingCount)
      .limit(showingCount)
      .toArray();
    return { total, images };
  }, [currentPage, showingCount]);

  return queryResult;
};

export default useSubscribeBackgroundImages;
