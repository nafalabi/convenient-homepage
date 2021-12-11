import { useLiveQuery } from "dexie-react-hooks";
import db from "../../../../../app/storage/dexie/db";

const useSubscribeBackgroundImages = (
  showingImage: number,
  currentPage: number
) => {
  const queryResult = useLiveQuery(async () => {
    const total = await db.background.toCollection().count();
    const images = await db.background
      .orderBy("downloadtime")
      .reverse()
      .offset(currentPage * showingImage)
      .limit(showingImage)
      .toArray();
    return { total, images };
  }, [currentPage, showingImage]);

  return queryResult;
};

export default useSubscribeBackgroundImages;
