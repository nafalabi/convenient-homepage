import { useLiveQuery } from "dexie-react-hooks";
import db from "app/storage/dexie/db";

const useSubscribeBackgroundImages = (
  showingImage: number,
  currentPage: number
) => {
  const queryResult = useLiveQuery(
    async () => {
      const total = await db.backgroundimage.toCollection().count();
      const images = await db.backgroundimage
        .offset(currentPage * showingImage)
        .limit(showingImage)
        .toArray();
      return { total, images };
    },
    [currentPage, showingImage],
    { total: 0, images: [] }
  );

  return queryResult;
};

export default useSubscribeBackgroundImages;
