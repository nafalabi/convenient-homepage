import dexieDB from "../app/storage/dexie/db";

const clearBackground = async () => {
  const now = Math.floor(Date.now() / 1000);
  const threshold = 60 * 60 * 24 * 30; // 30 days
  const ids = await dexieDB.background
    .where("expireat")
    .below(now - threshold)
    .primaryKeys();
  await dexieDB.background.bulkDelete(ids);
  console.info(`Background images cleared, ids: ${JSON.stringify(ids)}`);
};

export default clearBackground;
