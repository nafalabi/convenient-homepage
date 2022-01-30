import { Search } from "@mui/icons-material";
import { Fade } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { actions as searchActions } from "features/search/slice";
import { Box } from "@mui/system";

const SearchField = () => {
  const dispatch = useDispatch();
  const isSearchComponentOpen = useSelector(({ search }) => search.isOpen);
  const isSelfOpen = !isSearchComponentOpen;

  const handleClick = (e: any) => {
    e.preventDefault();
    dispatch(searchActions.openSearch());
  };

  return (
    <Fade in={isSelfOpen}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          px: 2,
          width: "600px",
          alignSelf: "center",
          color: "rgba(255,255,255,0.5)",
          mt: 2,
          cursor: "pointer",
          "&:hover": {
            color: "#fff",
          },
        }}
        onClick={handleClick}
      >
        <Search />
        <Box
          sx={{
            mx: 1,
            my: 1,
            borderBottom: "2px solid",
            flexGrow: 1,
          }}
        >
          Search here...
        </Box>
      </Box>
    </Fade>
  );
};

export default SearchField;
