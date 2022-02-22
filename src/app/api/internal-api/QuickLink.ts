import dexieDB from "app/storage/dexie/db";
import QuickLink from "app/storage/dexie/QuickLink";
import getFaviconFromUrl from "app/utils/getFaviconFromUrl";
import { IconType, QuickLinkTypes } from "constant";
import { SearchItem, SearchItemType } from "features/search/types";

class InternalQuickLinkAPI {
  static createFromSearchedLink = async (searchItemData: SearchItem) => {
    const newQL = new QuickLink();

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
    const newQL = new QuickLink();

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
}

export default InternalQuickLinkAPI;
