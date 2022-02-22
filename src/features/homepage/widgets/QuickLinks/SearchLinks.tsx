import React from "react";
import { Box, TextField } from "@mui/material";
import useSearchLogic from "features/search/hooks/useSearchLogic";
import SearchItemRender from "features/search/SearchItemRender";
import { SearchItem } from "features/search/types";

interface SearchLinksProp {
  onLinkClicked: (item: SearchItem) => void;
}

const SearchLinks = ({ onLinkClicked }: SearchLinksProp) => {
  const { keyword, setKeyword, result } = useSearchLogic();

  return (
    <>
      <TextField
        fullWidth
        size="small"
        placeholder="Search link here ..."
        value={keyword}
        onChange={(e) => {
          setKeyword(e.target.value);
        }}
        autoFocus
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          overflow: "hidden auto",
          mt: 1,
          height: "40vh",
          minHeight: 300,
        }}
      >
        {result.map((item) => (
          <SearchItemRender
            key={`${item.id}-${item.type}`}
            item={item}
            selected={false}
            onClick={() => onLinkClicked(item)}
            sx={{ paddingLeft: 0 }}
          />
        ))}
      </Box>
    </>
  );
};

export default SearchLinks;
