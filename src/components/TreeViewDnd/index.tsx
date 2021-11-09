import React from "react";
import { Box, LinearProgress } from "@mui/material";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TreeViewProps } from "./types";
import { ChevronRight, ExpandMore, Subject } from "@mui/icons-material";
import { TreeView } from "@mui/lab";
import TreeNode from "./TreeNode";

const TreeViewDnd = (props: TreeViewProps) => {
  const mapList = (arrayList: any[]) => {
    return arrayList.map((note, index) => {
      return (
        <TreeNode
          key={note.noteid}
          nodeId={String(note.noteid)}
          labelText={note.notename}
          labelIcon={Subject}
          totalChildren={note.totalChildren}
          isLastItem={index + 1 === arrayList.length}
        >
          {note.children && mapList(note.children)}
          {!note.expanded && <LinearProgress />}
        </TreeNode>
      );
    });
  };

  return (
    <Box>
      <DndProvider backend={HTML5Backend} context={window}>
        <TreeView
          defaultCollapseIcon={<ExpandMore />}
          defaultExpandIcon={<ChevronRight />}
          expanded={props.expanded}
          selected={props.selected}
          onNodeToggle={props.onNodeToggle}
          onNodeSelect={props.onNodeSelect}
        >
          {mapList(props.list)}
        </TreeView>
      </DndProvider>
    </Box>
  );
};

export default TreeViewDnd;
