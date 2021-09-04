import React, { useEffect, useRef, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Dialog,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  Box,
  Divider,
} from "@material-ui/core";
import { useCallback } from "react";
import useDebouncedCallback from "../hooks/useDebounceCallback";

const MIN_WIDTH = 240;
const MAX_WIDTH = 600;

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
    borderRadius: "0px",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  title: {
    width: MIN_WIDTH - theme.spacing(2),
  },
  drawer: {
    width: MIN_WIDTH,
    flexShrink: 0,
  },
  drawerPaper: {
    position: "absolute",
    width: MIN_WIDTH,
    border: "none",
  },
  drawerContainer: {
    overflow: "auto",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    paddingTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
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
  const theme = useTheme();
  const dialogRef = useRef(null);
  const drawerRef = useRef(null);
  const titleRef = useRef(null);

  const [dragging, setDragging] = useState(false);

  const onTouchStart = (e) => {
    setDragging(true);
  };

  const onMove = useCallback(
    useDebouncedCallback((clientX) => {
      if (!drawerRef.current) return;
      const drawerWidth = drawerRef.current.clientWidth;

      if (dragging && drawerWidth) {
        const leftBound = drawerRef.current.getBoundingClientRect().x;
        let newDrawerWidth = clientX - leftBound;

        if (newDrawerWidth < MIN_WIDTH) {
          newDrawerWidth = MIN_WIDTH;
        }

        if (newDrawerWidth > MAX_WIDTH) {
          newDrawerWidth = MAX_WIDTH;
        }

        // Set Drawer Width
        const drawerEl = drawerRef.current;
        const drawerBodyEl = drawerRef.current.children[0];
        drawerEl.style["width"] = `${newDrawerWidth}px`;
        drawerBodyEl.style["width"] = `${newDrawerWidth}px`;
        // Set title width
        const titleEl = titleRef.current;
        titleEl.style["width"] = `${newDrawerWidth - theme.spacing(2)}px`;
      }
    }, 10),
    [dragging]
  );

  const onMouseMove = useCallback(
    (e) => {
      if (dragging) e.preventDefault();
      onMove(e.clientX);
    },
    [onMove, dragging]
  );

  const onTouchMove = useCallback(
    (e) => {
      onMove(e.touches[0].clientX);
    },
    [onMove]
  );

  const onMouseUp = useCallback(() => {
    setDragging(false);
  }, [setDragging]);

  const onMouseDown = (e) => {
    setDragging(true);
  };

  useEffect(() => {
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("touchmove", onTouchMove);
    document.addEventListener("mouseup", onMouseUp);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, [onMouseMove, onTouchMove, onMouseUp]);

  return (
    <Dialog
      ref={dialogRef}
      open={open}
      onClose={toggle}
      maxWidth="lg"
      fullWidth={true}
      classes={{ paper: classes.dialogPaper }}
      disableEnforceFocus={true}
    >
      <div className={classes.root}>
        <AppBar position="absolute" className={classes.appBar}>
          <Toolbar>
            <Typography
              variant="h6"
              ref={titleRef}
              className={classes.title}
              noWrap
            >
              {title}
            </Typography>
            <ToolbarItemComponent dialogRef={dialogRef} />
          </Toolbar>
        </AppBar>
        <Box display="flex">
          <Drawer
            ref={drawerRef}
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
            pl={1}
            style={{ cursor: "w-resize" }}
            onMouseDown={onMouseDown}
            onTouchStart={onTouchStart}
            onTouchEnd={onMouseUp}
          >
            <Divider orientation="vertical" />
          </Box>
        </Box>
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
