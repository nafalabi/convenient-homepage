import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { actions } from "../slice";

const useSummonSearchComponent = () => {
  const dispatch = useDispatch();

  const summonSearch = useCallback(
    (e) => {
      console.log("keypress", e);
      dispatch(actions.openSearch());
    },
    [dispatch]
  );

  useEffect(() => {
    const el = document.querySelector("#root") as HTMLElement;
    el?.setAttribute("tabindex", "-1");
    el?.focus();
    el.style.outline = "none";
    el?.addEventListener("keypress", summonSearch, true);
    return () => el?.removeEventListener("keypress", summonSearch);
  }, [summonSearch]);
};

export default useSummonSearchComponent;
