import { IconType, QuickLinkTypes } from "constant";
import dexieDB from "app/db";

class QuickLinkModel {
  id?: number;
  type?: QuickLinkTypes;
  iconId?: string;
  iconType?: IconType;
  title?: string;
  refId?: number;
  order?: number;

  url?: string; // For {this.type == QuickLinkTypes.MANUAL_LINK} only

  async save() {
    try {
      const id = await dexieDB.quicklink.put(this, this.id);
      this.id = id;
      return id;
    } catch (error: any) {
      console.error(error);
      // throw error;
    }
  }
}

dexieDB.quicklink.mapToClass(QuickLinkModel);

export default QuickLinkModel;
