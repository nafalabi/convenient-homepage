import dexieDB from "app/db";
import QuickLinkModel from "app/db/model/QuickLink";
import getFaviconFromUrl from "app/utils/getFaviconFromUrl";
import { IconType, QuickLinkTypes } from "app/constant";
import { SearchItem, SearchItemType } from "features/search/types";

class QuickLinkController {
  static createFromSearchedLink = async (searchItemData: SearchItem) => {
    const newQL = new QuickLinkModel();

    const countQL = await dexieDB.quicklink.count();

    newQL.iconId = searchItemData.icon;
    newQL.iconType = searchItemData.iconType;
    newQL.title = searchItemData.title;
    newQL.refId = parseInt(searchItemData.id as string);
    newQL.order = countQL;

    switch (searchItemData?.type) {
      case SearchItemType.BOOKMARKS:
        newQL.type = QuickLinkTypes.BOOKMARKS;
        break;
      case SearchItemType.NOTE:
        newQL.type = QuickLinkTypes.NOTE;
        break;
      case SearchItemType.PREDEFINED_ACTIONS:
        newQL.type = QuickLinkTypes.PREDEFINED_ACTIONS;
        break;
      default:
        break;
    }

    newQL.save();
  };

  static createFromManualLink = async (title: string, url: string) => {
    const newQL = new QuickLinkModel();

    const countQL = await dexieDB.quicklink.count();

    const favicon = getFaviconFromUrl(url);

    newQL.iconId = favicon;
    newQL.iconType = IconType.URL;
    newQL.title = title;
    newQL.refId = undefined;
    newQL.order = countQL;
    newQL.type = QuickLinkTypes.MANUAL_LINK;
    newQL.url = url;

    newQL.save();
  };

  static getList = async () => {
    return await dexieDB.quicklink.orderBy("order").toArray();
  };

  static getQuickLinkDetail = async (id: number) => {
    return await dexieDB.quicklink.get(id);
  };

  static removeQuickLink = async (id?: number) => {
    if (!id) return;
    return await dexieDB.quicklink.delete(id);
  };

  static updateQuickLink = async (
    id: number,
    { title, url }: { title: string; url?: string }
  ) => {
    if (!id) return 0;
    return await dexieDB.quicklink.update(id as number, { title, url });
  };

  static reorderQuickLink = async (sourceId: number, destId: number) => {
    return await dexieDB.transaction("rw", dexieDB.quicklink, async () => {
      const source = await dexieDB.quicklink.get(sourceId);
      const target = await dexieDB.quicklink.get(destId);

      if (!target || !source) return;

      const isIncrement = source.order < target.order;
      const upperOffset = isIncrement ? source.order : target.order;
      const lowerOffset = isIncrement ? target.order : source.order;

      await dexieDB.quicklink
        .where("order")
        .between(upperOffset, lowerOffset + 1)
        .modify(async (row: QuickLinkModel) => {
          if (row.id === source.id) return;
          row.order += isIncrement ? -1 : 1;
        });

      source.order = target.order;
      await source.save();
    });
  };
}

export default QuickLinkController;
