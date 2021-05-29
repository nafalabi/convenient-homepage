import React, { useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Dialog,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  Box,
} from "@material-ui/core";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    position: "relative",
    flexGrow: 1,
    overflow: "hidden",
  },
  dialogPaper: {
    minWidth: "800px",
    minHeight: `calc(100vh - ${theme.spacing(6)}px)`,
    overflow: "hidden",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    position: "absolute",
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    paddingTop: theme.spacing(2),
    overflow: "auto",
  },
}));

const PanelWithSidebar = ({
  open,
  toggle,
  title,
  SidebarComponent,
  ContentComponent,
  ToolbarItemComponent,
}) => {
  const classes = useStyles();
  const dialogRef = useRef(null);

  return (
    <Dialog
      ref={dialogRef}
      open={open}
      onClose={toggle}
      maxWidth="lg"
      fullWidth={true}
      classes={{ paper: classes.dialogPaper }}
    >
      <div className={classes.root}>
        <AppBar position="absolute" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" noWrap>
              {title}
            </Typography>
            <ToolbarItemComponent dialogRef={dialogRef} />
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <Toolbar />
          <div className={classes.drawerContainer}>
            <SidebarComponent dialogRef={dialogRef} />
          </div>
        </Drawer>
        <Box
          flexGrow={1}
          display="flex"
          flexDirection="column"
          overflow="hidden"
          position="relative"
        >
          <Toolbar />
          <main className={classes.content}>
            <ContentComponent dialogRef={dialogRef} />
          </main>
        </Box>
      </div>
    </Dialog>
  );
};

PanelWithSidebar.defaultProps = {
  SidebarComponent: () => null,
  ContentComponent: () => null,
  ToolbarItemComponent: () => null,
};

export default PanelWithSidebar;
