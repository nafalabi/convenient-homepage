import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../slice";

const useSummonSearchComponent = () => {
  const dispatch = useDispatch();
  const alreadySetup = useSelector(({ homepage }) => homepage.alreadySetup);

  const summonSearch = useCallback(
    (e) => {
      dispatch(actions.openSearch());
    },
    [dispatch]
  );

  useEffect(() => {
    const el = document.querySelector("#root") as HTMLElement;

    if (alreadySetup) {
      el?.setAttribute("tabindex", "-1");
      el?.focus();
      el.style.outline = "none";
      el?.addEventListener("keypress", summonSearch, true);
    }

    return () => el?.removeEventListener("keypress", summonSearch);
  }, [summonSearch, alreadySetup]);
};

export default useSummonSearchComponent;
