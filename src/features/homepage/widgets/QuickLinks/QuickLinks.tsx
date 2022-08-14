import React, { useCallback } from "react";
import { styled } from "@mui/material";
import QuickLinkItem from "./QuickLinkItem";
import AddNewQuickLink from "./AddNew";
import { useLiveQuery } from "dexie-react-hooks";
import QuickLinkModel from "app/db/model/QuickLink";
import AppController from "app/controller";
import { DndView } from "components/DndView";

export const QUICK_LINKS_MAX_ITEM = 12;

const RootQuickLinks = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: theme.spacing(2),

  "& .row": {
    display: "flex",
    gridGap: theme.spacing(2),
    width: "600px",
    flexWrap: "wrap",
    justifyContent: "center",
  },
}));

export interface QuickLinksProps {
  onCompleteLoading: () => void;
}

const QuickLinks = ({ onCompleteLoading }: QuickLinksProps) => {
  const list = useLiveQuery<QuickLinkModel[], QuickLinkModel[]>(
    async () => {
      const result = await AppController.quicklink.getList();
      onCompleteLoading();
      return result;
    },
    [],
    []
  );

  const onMove = useCallback((sourceId, destId) => {
    AppController.quicklink.reorderQuickLink(sourceId, destId);
  }, []);

  return (
    <RootQuickLinks>
      <div className="row">
        <DndView
          items={list}
          itemIdKeys="id"
          renderItem={({ itemData, ...props }) => (
            <QuickLinkItem {...props} data={itemData} />
          )}
          onMove={onMove}
        />
        {list.length < QUICK_LINKS_MAX_ITEM && <AddNewQuickLink />}
      </div>
    </RootQuickLinks>
  );
};

export default QuickLinks;
