import { Migration } from "./types";

export default {
  schema: {
    note: "++noteid, notename, parentnoteid, expanded, [parentnoteid+notename], order, [parentnoteid+order]",
    notecontent: "&noteid",
    backgroundimage: "++id, active, activated_at, provider",
    quicklink: "++id, order",
  },
  version: 32,
} as Migration;
