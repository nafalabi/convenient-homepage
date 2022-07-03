import { ShortcutNames } from "app/storage/app-data/shortcuts";
import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const useShortcut = () => {
  const navigate = useNavigate();
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
          navigate("/drawer");
          break;
        case ShortcutNames.OPEN_NOTES:
          navigate("/note");
          break;
        case ShortcutNames.OPEN_BOOKMARKS:
          navigate("/bookmark");
          break;
        case ShortcutNames.OPEN_SETTINGS:
          navigate("/setting");
          break;
        default:
          break;
      }
    },
    [shortcuts, navigate]
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
