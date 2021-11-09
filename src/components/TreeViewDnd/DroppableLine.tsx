import { Box } from "@mui/system";
import React from "react";
import { DroppableLineProps } from "./types";

const DroppableLine = React.forwardRef<any, DroppableLineProps>(
  (props, ref) => {
    return (
      <Box
        ref={ref}
        data-handler-id={props["data-handler-id"]}
        sx={{
          padding: "3px 0 0 0",
          backgroundColor: props.isHovered ? "blue" : "transparent",
        }}
      />
    );
  }
);

export default DroppableLine;
