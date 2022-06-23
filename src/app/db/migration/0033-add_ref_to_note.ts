import { v4 as uuidv4 } from "uuid";
import { Migration } from "./types";

export default {
  indexes: {
    note: "++noteid, ref, notename, parentnoteid, expanded, [parentnoteid+notename], order, [parentnoteid+order]",
  },
  version: 33,
  upgrade: (trans) => {
    return trans
      .table("note")
      .toCollection()
      .modify((row) => {
        if (!row.ref) row.ref = uuidv4();
      });
  },
} as Migration;
