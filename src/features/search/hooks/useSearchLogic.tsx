import { debounce } from "@mui/material";
import throttle from "app/utils/throttle";
import React, { useCallback, useEffect, useState } from "react";
import { SearchItem, SearchItemType } from "../types";
import { handleActions } from "../utils/actions-handler";
import {
  searchBookmarks,
  searchNotes,
  searchPredefinedActions,
} from "../utils/search-functions";

const useSearchLogic = () => {
  const [keyword, setKeyword] = useState("");
  const [result, setResult] = useState<SearchItem[]>([]);
  const [selectedIndex, selectIndex] = useState(0);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateResult = useCallback(
    debounce((keyword) => {
      searchNotes(keyword).then((items) =>
        setResult((oldValue) => {
          const filteredOldValue = oldValue.filter(
            (val) => val.type !== SearchItemType.NOTE
          );
          return [...filteredOldValue, ...items];
        })
      );

      searchBookmarks(keyword).then((items) =>
        setResult((oldValue) => {
          const filteredOldValue = oldValue.filter(
            (val) => val.type !== SearchItemType.BOOKMARKS
          );
          return [...filteredOldValue, ...items];
        })
      );

      searchPredefinedActions(keyword).then((items) =>
        setResult((oldValue) => {
          const filteredOldValue = oldValue.filter(
            (val) => val.type !== SearchItemType.PREDEFINED_ACTIONS
          );
          return [...filteredOldValue, ...items];
        })
      );
    }, 500),
    []
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const moveCursor = useCallback(
    throttle((direction: "up" | "down") => {
      selectIndex((oldValue) => {
        let newIndex = oldValue + (direction === "up" ? -1 : +1);

        if (newIndex < 0) return 0;
        else if (newIndex > result.length - 1) return result.length - 1;
        else return newIndex;
      });
    }, 200),
    [selectIndex, result.length]
  );

  const executeAction = useCallback(
    (index: number) => {
      handleActions(result[index], keyword).then(() => {
        setKeyword("");
      });
    },
    [keyword, result]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement | HTMLDivElement>) => {
      const { code, shiftKey } = e;

      if (["Tab", "ArrowUp", "ArrowDown", "Enter"].includes(code))
        e.preventDefault();

      switch (code) {
        case "Tab":
          if (shiftKey) moveCursor("up");
          else moveCursor("down");
          break;
        case "ArrowUp":
          moveCursor("up");
          break;
        case "ArrowDown":
          moveCursor("down");
          break;
        case "Enter":
          executeAction(selectedIndex);
          break;
        default:
          break;
      }
    },
    [executeAction, moveCursor, selectedIndex]
  );

  useEffect(() => {
    updateResult(keyword);
  }, [keyword, updateResult]);

  return {
    keyword,
    setKeyword,
    selectedIndex,
    result,
    executeAction,
    handleKeyDown,
  };
};

export default useSearchLogic;
