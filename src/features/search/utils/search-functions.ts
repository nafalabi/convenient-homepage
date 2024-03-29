import AppController from "app/controller";
import { IconType } from "app/constant";
import predefinedActions, { PredefinedActionsIds } from "./predefined-actions";
import { SearchItem, SearchItemType } from "../types";
import getFaviconFromUrl from "app/utils/getFaviconFromUrl";

export const searchNotes = async (keyword: string) => {
  const result: SearchItem[] = [];

  if (keyword === "") return result;

  const notes = await AppController.note.searchNote(keyword, true);
  notes.forEach((note) => {
    result.push({
      id: note.noteid ?? 0,
      title: note.notename ?? "",
      subtitle: "Note",
      type: SearchItemType.NOTE,
      icon: note.iconId,
      iconType: note.iconType,
    });
  });

  return result;
};

export const searchBookmarks = async (keyword: string) => {
  const result: SearchItem[] = [];

  if (keyword === "") return result;

  const bookmarks = await chrome.bookmarks.search(keyword);
  bookmarks.forEach((bookmark) => {
    const isFolder = bookmark.url === undefined;
    const icon = isFolder
      ? "Folder"
      : getFaviconFromUrl(bookmark.url as string);
    const iconType = isFolder ? IconType.MATERIAL_ICON : IconType.URL;
    const subtitle = isFolder ? "Bookmark Folder" : `Bookmark: ${bookmark.url}`;

    result.push({
      id: bookmark.id,
      title: bookmark.title,
      subtitle,
      type: SearchItemType.BOOKMARKS,
      icon,
      iconType,
    });
  });

  return result;
};

export const searchPredefinedActions = async (keyword: string) => {
  const result: SearchItem[] = [];

  const actions = predefinedActions.filter((action) => {
    if (action.id === PredefinedActionsIds.SEARCH_ON_INTERNET)
      return keyword !== "";

    return action.title
      .toLocaleLowerCase()
      .includes(keyword.toLocaleLowerCase());
  });
  actions.forEach((action) => {
    result.push(action);
  });

  return result;
};
