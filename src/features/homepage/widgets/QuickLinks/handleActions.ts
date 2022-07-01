import AppController from "app/controller";
import { QuickLinkTypes } from "app/constant";
import {
  handleActions,
  handleOpenNotes,
  handleVisitBookmarks,
} from "features/search/utils/actions-handler";
import predefinedActions from "features/search/utils/predefined-actions";

const handleQuickLinkActions = async (id: number) => {
  const QL = await AppController.quicklink.getQuickLinkDetail(id);
  if (QL === undefined) return;

  switch (QL.type) {
    case QuickLinkTypes.BOOKMARKS:
      handleVisitBookmarks(String(QL.refId));
      break;
    case QuickLinkTypes.NOTE:
      handleOpenNotes(QL.refId);
      break;
    case QuickLinkTypes.PREDEFINED_ACTIONS:
      const action = predefinedActions.find(({ id }) => id === QL.refId);
      if (action === undefined) return;
      handleActions(action);
      break;
    case QuickLinkTypes.MANUAL_LINK:
      if (QL.url) window.location.href = QL.url as string;
      break;
    default:
      break;
  }
};

export default handleQuickLinkActions;
