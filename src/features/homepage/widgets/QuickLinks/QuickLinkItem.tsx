import React, { SyntheticEvent } from "react";
import { styled } from "@mui/material";
import commonStyle from "./commonStyle";
import QuickLink from "app/db/schema/QuickLink";
import IconRenderer from "components/IconRenderer";
import handleQuickLinkActions from "./handleActions";
import ActionMenu from "./ActionMenu";

const RootQuickLinkItem = styled("div")(({ theme }) => ({
  ...commonStyle(theme),
  "& .actions": {
    opacity: 0,
  },
  "&:hover .actions": {
    opacity: 1,
  },
}));

interface QuickLinkItemProps {
  data: QuickLink;
}

const QuickLinkItem = ({ data }: QuickLinkItemProps) => {
  const handleClick = (e: SyntheticEvent) => {
    e.stopPropagation();
    handleQuickLinkActions(data.id as number);
  };

  return (
    <RootQuickLinkItem onClick={handleClick}>
      <div className="icon">
        <IconRenderer iconId={data.iconId} iconType={data.iconType} />
      </div>
      <div className="name">{data.title}</div>
      <ActionMenu className="actions" data={data} />
    </RootQuickLinkItem>
  );
};

export default QuickLinkItem;
