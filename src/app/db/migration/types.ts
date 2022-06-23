import { Transaction } from "dexie";

export interface Migration {
  /** migration version, the latest will be the version number of your db */
  version: number;
  /** db indexes, for detail see https://dexie.org/docs/Version/Version.stores() */
  indexes: { [index: string]: string };
	/** if the migration require to modify db data, provide this upgrade function */
  upgrade?: (trans: Transaction) => void | PromiseLike<any>;
}
