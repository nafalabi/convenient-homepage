import React, { useState } from "react";
import { Dialog, Icon, Paper, styled, Tab, Tabs } from "@mui/material";
import commonStyle from "./commonStyle";
import { Box } from "@mui/system";
import InternalAPI from "app/api/internal-api";
import { SearchItem } from "features/search/types";
import SearchLinks from "./SearchLinks";
import CreateLink from "./CreateLink";

enum AddQLTabs {
  SEARCH_LINK,
  ADD_MANUAL,
}

const RootAddNewQuickLink = styled("div")(({ theme }) => commonStyle(theme));

const AddNewQuickLink = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [curTab, setTab] = useState(AddQLTabs.ADD_MANUAL);

  const handleOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const handleCreateFromSearch = (item: SearchItem) => {
    InternalAPI.quicklink.createFromSearchedLink(item);
    setDialogOpen(false);
  };

  const handleManualCreate = (title: string, url: string) => {
    InternalAPI.quicklink.createFromManualLink(title, url);
    setDialogOpen(false);
  };

  return (
    <>
      <RootAddNewQuickLink onClick={handleOpen}>
        <div className="icon">
          <Icon>add</Icon>
        </div>
        <div className="name">Add shortcut</div>
      </RootAddNewQuickLink>

      <Dialog open={dialogOpen} onClose={handleClose}>
        <Paper
          elevation={2}
          sx={{
            width: 300,
            p: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box sx={{ mb: 1, textAlign: "center" }}>Add shortcut</Box>

          <Tabs
            value={curTab}
            onChange={(e, val) => setTab(val)}
            centered
            sx={{ mb: 1 }}
          >
            <Tab label="Search Link" />
            <Tab label="Add Manually" />
          </Tabs>

          {AddQLTabs.SEARCH_LINK === curTab && (
            <SearchLinks onLinkClicked={handleCreateFromSearch} />
          )}
          {AddQLTabs.ADD_MANUAL === curTab && (
            <CreateLink onLinkCreated={handleManualCreate} />
          )}
        </Paper>
      </Dialog>
    </>
  );
};

export default AddNewQuickLink;
