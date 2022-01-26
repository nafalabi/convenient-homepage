import { ShortcutNames } from "app/storage/app-data/shortcuts";
import { actions as bookmarkActions } from "features/bookmark/slice";
import { actions as drawerActions } from "features/drawer/slice";
import { actions as noteActions } from "features/note/slice";
import { actions } from "features/settings/slice";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useShortcut = () => {
  const dispatch = useDispatch();
  const shortcuts = useSelector(({ settings }) => settings.shortcuts);

  const handleShortcut = useCallback(
    (event: KeyboardEvent) => {
      const { key, ctrlKey, shiftKey, altKey } = event;

      let matchedShortcut: ShortcutNames | null = null;

      for (const shorcutName in shortcuts) {
        const shortcut = shortcuts[shorcutName];

        if (
          key === shortcut.key &&
          ctrlKey === shortcut.ctrl &&
          shiftKey === shortcut.shift &&
          altKey === shortcut.alt
        ) {
          matchedShortcut = shorcutName as ShortcutNames;
          break;
        }
      }

      if (matchedShortcut === null) return;

      event.preventDefault();

      switch (matchedShortcut) {
        case ShortcutNames.OPEN_DRAWER:
          dispatch(drawerActions.toggleDrawer());
          break;
        case ShortcutNames.OPEN_NOTES:
          dispatch(noteActions.toggleNote());
          break;
        case ShortcutNames.OPEN_BOOKMARKS:
          dispatch(bookmarkActions.toggleBookmark());
          break;
        case ShortcutNames.OPEN_SETTINGS:
          dispatch(actions.toggleSettings());
          break;
        default:
          break;
      }
    },
    [shortcuts, dispatch]
  );

  useEffect(() => {
    const el = document.querySelector("#root") as HTMLElement;
    el?.setAttribute("tabindex", "-1");
    el?.focus();
    el.style.outline = "none";
    el?.addEventListener("keydown", handleShortcut, true);
    return () => el?.removeEventListener("keydown", handleShortcut);
  }, [handleShortcut]);
};

export default useShortcut;
