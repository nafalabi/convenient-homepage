import React, { SyntheticEvent } from "react";
import { styled } from "@mui/material";
import commonStyle from "./commonStyle";
import QuickLinkModel from "app/db/model/QuickLink";
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

interface QuickLinkItemProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  data: QuickLinkModel;
}

const QuickLinkItem = React.forwardRef<HTMLDivElement, QuickLinkItemProps>(
  ({ data, ...props }, ref) => {
    const handleClick = (e: SyntheticEvent) => {
      e.stopPropagation();
      handleQuickLinkActions(data.id as number);
    };

    return (
      <RootQuickLinkItem onClick={handleClick} {...props} ref={ref}>
        <div className="icon">
          <IconRenderer iconId={data.iconId} iconType={data.iconType} />
        </div>
        <div className="name">{data.title}</div>
        <ActionMenu className="actions" data={data} />
      </RootQuickLinkItem>
    );
  }
);

export default QuickLinkItem;
