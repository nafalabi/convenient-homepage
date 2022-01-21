import React from "react";
import {
  Backdrop,
  Divider,
  Fade,
  InputBase,
  Modal,
  Paper,
} from "@mui/material";
import { Box } from "@mui/system";

import SearchItemRender from "./SearchItemRender";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "./slice";
import useSearchLogic from "./hooks/useSearchLogic";

const SearchComponent = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(({ search }) => search.isOpen);
  const {
    keyword,
    setKeyword,
    selectedIndex,
    result,
    executeAction,
    handleKeyDown,
  } = useSearchLogic();

  const handleClose = () => {
    dispatch(actions.closeSearch());
    setKeyword("");
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      sx={{ outline: 0 }}
    >
      <Fade in={isOpen}>
        <Paper
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            flexDirection: "column",
            width: 500,
            maxHeight: "80vh",
            height: "80vh",
            outline: 0,
          }}
        >
          <InputBase
            fullWidth
            sx={{ mx: 2, my: 1 }}
            value={keyword}
            onChange={(e) => {
              setKeyword(e.target.value);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search here..."
            autoFocus
          />

          <Divider />

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              overflow: "hidden auto",
            }}
          >
            {result.map((item, index) => (
              <SearchItemRender
                key={`${item.id}-${item.type}`}
                item={item}
                selected={selectedIndex === index}
                onClick={() => executeAction(index)}
              />
            ))}
          </Box>

          <Divider />

          <Box px={2} py={1}>
            {result.length} results
          </Box>
        </Paper>
      </Fade>
    </Modal>
  );
};

export default SearchComponent;
