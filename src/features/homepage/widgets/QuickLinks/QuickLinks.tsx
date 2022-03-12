import React from "react";
import { styled } from "@mui/material";
import QuickLinkItem from "./QuickLinkItem";
import AddNewQuickLink from "./AddNew";
import { useLiveQuery } from "dexie-react-hooks";
import QuickLinkModel from "app/db/model/QuickLink";
import AppController from "app/controller";

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

const QuickLinks = () => {
  const list = useLiveQuery<QuickLinkModel[], QuickLinkModel[]>(
    async () => {
      return await AppController.quicklink.getList();
    },
    [],
    []
  );

  return (
    <RootQuickLinks>
      <div className="row">
        {list.map((ql) => (
          <QuickLinkItem data={ql} key={`${ql.id}-${ql.type}`} />
        ))}
        {list.length < QUICK_LINKS_MAX_ITEM && <AddNewQuickLink />}
      </div>
    </RootQuickLinks>
  );
};

export default QuickLinks;
