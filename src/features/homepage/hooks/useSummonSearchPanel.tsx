import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";

import { actions } from "features/search/slice";

const useSummonSearchPanel = () => {
  const dispatch = useDispatch();

  const summonSearch = useCallback(() => {
    dispatch(actions.openSearch());
  }, [dispatch]);

  useEffect(() => {
    const el = document.querySelector("#root") as HTMLElement;
    el?.setAttribute("tabindex", "-1");
    el?.focus();
    el.style.outline = "none";
    el?.addEventListener("keypress", summonSearch, true);
    return () => el?.removeEventListener("keypress", summonSearch);
  }, [summonSearch]);
};

export default useSummonSearchPanel;
