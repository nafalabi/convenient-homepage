import store from "../store";

import { actions as homepageActions } from "features/homepage/slice";
import { actions } from "features/settings/slice";

const initializeHomepage = () => {
  store.dispatch(homepageActions.initialize());
  store.dispatch(actions.init());
};

export default initializeHomepage;
