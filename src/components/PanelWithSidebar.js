import React from "react";
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
    minHeight: "80vh",
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
    overflow: "auto",
  },
}));

const PanelWithSidebar = ({
  open,
  toggle,
  title,
  SidebarComponent,
  ContentComponent,
}) => {
  const classes = useStyles();

  return (
    <Dialog
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
            <SidebarComponent />
          </div>
        </Drawer>
        <Box
          flexGrow={1}
          display="flex"
          flexDirection="column"
          overflow="hidden"
        >
          <Toolbar />
          <main className={classes.content}>
            <ContentComponent />
          </main>
        </Box>
      </div>
    </Dialog>
  );
};

PanelWithSidebar.defaultProps = {
  SidebarComponent: () => null,
  ContentComponent: () => null,
};

export default PanelWithSidebar;
