import React, { useEffect, useRef } from "react";
import { useTheme, darken } from "@mui/material";
import { Box } from "@mui/system";
import { SearchItem } from "./types";
import IconRenderer from "components/IconRenderer";

const SearchItemRender = ({
  item,
  selected,
  onClick,
}: {
  item: SearchItem;
  selected: boolean;
  onClick: () => void;
}) => {
  const theme = useTheme();
  const rootRef = useRef<HTMLDivElement>();

  useEffect(() => {
    if (selected && rootRef.current)
      rootRef.current.scrollIntoView({
        behavior: "auto",
        block: "nearest",
        inline: "nearest",
      });
  }, [selected]);

  return (
    <Box
      ref={rootRef}
      className={selected ? "active" : ""}
      onClick={onClick}
      sx={{
        position: "relative",
        px: 2,
        py: 1,
        "&:hover, &.active": {
          cursor: "pointer",
        },
        "&.active, kbd": {
          backgroundColor: darken(theme.palette.background.default, 0.1),
        },
        "&:hover": {
          backgroundColor: darken(theme.palette.background.default, 0.05),
        },
      }}
    >
      <Box sx={{ display: "flex", overflow: "hidden" }}>
        <Box
          sx={{
            mr: 2,
            minWidth: "32px",
            maxWidth: "32px",
            textAlign: "center",
          }}
        >
          <IconRenderer
            iconId={item.icon}
            iconType={item.iconType}
            fontSize="large"
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {item.title}
          </Box>
          <Box
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              color: "text.secondary",
            }}
          >
            {item.subtitle}
          </Box>
        </Box>
        {selected && (
          <Box
            component={"kbd"}
            sx={{
              fontSize: "12px",
              fontFamily: "monospace",
              border: "1px solid #c6cbd1",
              padding: "3px 5px",
              borderRadius: "3px",
              boxShadow: "inset 0 -1px 0 #959da5",
              margin: "auto",
              marginLeft: "3px",
              whiteSpace: "nowrap",
            }}
          >
            Enter &crarr;
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default SearchItemRender;
