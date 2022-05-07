import Dexie from "dexie";
import m0032 from "./0032-init";
import m0033 from "./0033-add_ref_to_note";

export const listOfMigration = [m0032, m0033];

/**
 * Do database migration and defining its schema
 * for migration & schema definition detail see "src/app/db/migration" folder
 */
export const defineSchema = (db: Dexie) => {
  for (const migration of listOfMigration) {
    const instance = db.version(migration.version).stores(migration.schema);
    if (migration.upgrade) instance.upgrade(migration.upgrade);
  }
};

export default defineSchema;
