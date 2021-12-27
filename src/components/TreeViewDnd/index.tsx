import React from "react";
import { Box, LinearProgress } from "@mui/material";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TreeViewProps } from "./types";
import { ChevronRight, ExpandMore } from "@mui/icons-material";
import { TreeView } from "@mui/lab";
import TreeNode from "./TreeNode";
import { RenderIcon } from "components/IconPicker";

const TreeViewDnd = <T extends any>({
  resolveData,
  onNodeDrop,
  onNodeToggle,
  onNodeSelect,
  expanded,
  list,
  selected,
  useInternalDndProvider = true,
}: TreeViewProps<T>) => {
  const mapList = (arrayList: any[]) => {
    return arrayList.map((item, index) => {
      const resolvedData = resolveData(item);
      if (resolvedData.dontRender) return null;

      return (
        <TreeNode
          key={resolvedData.id}
          nodeId={String(resolvedData.id)}
          labelText={resolvedData.label}
          labelIcon={({ className }) => (
            <RenderIcon
              iconType={resolvedData.iconType}
              iconId={resolvedData.iconId}
              className={className}
            />
          )}
          totalChildren={resolvedData.hasChildren ? 1 : 0}
          nodeIndex={index}
          isLastItem={index + 1 === arrayList.length}
          onNodeDrop={onNodeDrop}
        >
          {resolvedData?.children && mapList(resolvedData.children ?? [])}
          {resolvedData.expanding && <LinearProgress />}
        </TreeNode>
      );
    });
  };

  const Wrapper = ({ children }: { children: JSX.Element }) =>
    useInternalDndProvider ? (
      <DndProvider backend={HTML5Backend} context={window}>
        {children}
      </DndProvider>
    ) : (
      <>{children}</>
    );

  return (
    <Box>
      <Wrapper>
        <TreeView
          defaultCollapseIcon={<ExpandMore />}
          defaultExpandIcon={<ChevronRight />}
          expanded={expanded}
          selected={selected}
          onNodeToggle={onNodeToggle}
          onNodeSelect={onNodeSelect}
        >
          {mapList(list)}
        </TreeView>
      </Wrapper>
    </Box>
  );
};

export default TreeViewDnd;
