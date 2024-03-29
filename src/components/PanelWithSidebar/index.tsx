import React, {
  RefObject,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import {
  Dialog,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  Box,
} from "@mui/material";
import debounce from "@mui/utils/debounce";
import { useCallback } from "react";
import { GlobalStyles } from "@mui/styled-engine";

const PREFIX = "PanelWithSidebar";

const MIN_WIDTH = 200;
const DEFAULT_WIDTH = 240;
const MAX_WIDTH = 600;

const classes = {
  root: `${PREFIX}-root`,
  dialogRoot: `${PREFIX}-dialogRoot`,
  dialogPaper: `${PREFIX}-dialogPaper`,
  appBar: `${PREFIX}-appBar`,
  title: `${PREFIX}-title`,
  drawer: `${PREFIX}-drawer`,
  drawerPaper: `${PREFIX}-drawerPaper`,
  drawerContainer: `${PREFIX}-drawerContainer`,
  divider: `${PREFIX}-divider`,
  content: `${PREFIX}-content`,
};

const StyledDialog = styled(Dialog)(({ theme }) => ({
  [`& .${classes.root}`]: {
    display: "flex",
    position: "relative",
    flexGrow: 1,
    overflow: "hidden",
  },

  [`& .${classes.dialogPaper}`]: {
    minWidth: "800px",
    minHeight: `calc(100vh - ${theme.spacing(6)})`,
    overflow: "hidden",
    borderRadius: "0px",
  },

  [`& .${classes.appBar}`]: {
    zIndex: theme.zIndex.drawer + 1,
  },

  [`& .${classes.title}`]: {
    width: `calc(${DEFAULT_WIDTH}px - ${theme.spacing(2)})`,
  },

  [`& .${classes.drawer}`]: {
    width: DEFAULT_WIDTH,
    flexShrink: 0,
  },

  [`& .${classes.drawerPaper}`]: {
    position: "absolute",
    width: DEFAULT_WIDTH,
    border: "none",
    backgroundColor: theme.palette.background.default,
    backgroundImage:
      "linear-gradient(rgba(255, 255, 255, .05), rgba(255, 255, 255, .05))",
  },

  [`& .${classes.drawerContainer}`]: {
    overflow: "auto",
  },

  [`& .${classes.divider}`]: {
    paddingLeft: theme.spacing(1),
    cursor: "w-resize",
    borderWidth: 0,
    borderRightWidth: "1px",
    borderStyle: "solid",
    borderColor: theme.palette.divider,
    backgroundColor: theme.palette.background.default,
    backgroundImage:
      "linear-gradient(rgba(255, 255, 255, .05), rgba(255, 255, 255, .05))",
  },

  [`& .${classes.content}`]: {
    flexGrow: 1,
    padding: theme.spacing(3),
    paddingTop: theme.spacing(2),
    // marginBottom: theme.spacing(4),
    overflow: "auto",
    backgroundColor: theme.palette.background.default,
    backgroundImage: "none",
  },
}));

const globalStyles = (
  <GlobalStyles
    styles={{
      [`.${classes.dialogRoot}`]: {
        zIndex: "800!important",
      },
    }}
  />
);

type CompositionComponent = (props: {
  dialogRef: RefObject<HTMLDivElement>;
}) => JSX.Element;

export interface PanelWithSidebarProps {
  open: boolean;
  onClose: () => void;
  title: string;
  SidebarComponent: CompositionComponent;
  ContentComponent: CompositionComponent;
  ToolbarItemComponent?: CompositionComponent;
  keepMounted?: boolean;
}

const PanelWithSidebar = ({
  open,
  onClose,
  title,
  SidebarComponent,
  ContentComponent,
  ToolbarItemComponent,
  keepMounted = false,
}: PanelWithSidebarProps) => {
  const theme = useTheme();
  const dialogRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLSpanElement>(null);

  const [dragging, setDragging] = useState(false);

  const onTouchStart = (e: SyntheticEvent) => {
    setDragging(true);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onMove = useCallback(
    debounce((clientX) => {
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
        const drawerEl = drawerRef.current as HTMLElement;
        const drawerBodyEl = drawerRef.current.children[0] as HTMLElement;
        drawerEl.style["width"] = `${newDrawerWidth}px`;
        drawerBodyEl.style["width"] = `${newDrawerWidth}px`;
        // Set title width
        const titleEl = titleRef.current as HTMLElement;
        const reservedSpace = theme.spacing(2).replace(/\D/g, "");
        titleEl.style["width"] = `${newDrawerWidth - Number(reservedSpace)}px`;
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

  const onMouseDown = (e: SyntheticEvent) => {
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
    <>
      {globalStyles}
      <StyledDialog
        ref={dialogRef}
        open={open}
        onClose={onClose}
        maxWidth="lg"
        fullWidth={true}
        classes={{ paper: classes.dialogPaper, root: classes.dialogRoot }}
        disableEnforceFocus={true}
        keepMounted={keepMounted}
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
              {ToolbarItemComponent && (
                <ToolbarItemComponent dialogRef={dialogRef} />
              )}
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
              className={classes.divider}
              onMouseDown={onMouseDown}
              onTouchStart={onTouchStart}
              onTouchEnd={onMouseUp}
            />
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
      </StyledDialog>
    </>
  );
};

export default PanelWithSidebar;
