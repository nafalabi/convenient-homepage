import { TreeItemProps } from "@mui/lab";
import { FC, SyntheticEvent } from "react";
import Note from "app/storage/dexie/Note";

export interface TreeViewProps {
  list: Note[];
  /**
   * Array of ID that are expanded
   */
  expanded: string[];
  /**
   * Current selected / active node
   */
  selected: string;
  /**
   * Callback function that will be called upon toggling node
   */
  onNodeToggle: (e: SyntheticEvent, ids: string[]) => void;
  /**
   * Callback function that will be called upon selecting node
   */
  onNodeSelect: (e: SyntheticEvent, id: string) => void;
  /**
   * Callback function that will be called upon drag n droping a node
   */
  onNodeDrop?: (
    id: string,
    targetId: string,
    targetType: "BEFORE" | "INSIDE" | "AFTER",
    targetIndex: number
  ) => void;
}

export interface TreeNodeProps extends TreeItemProps {
  bgColor?: string;
  color?: string;
  labelIcon: FC<{ className?: string }>;
  labelText: string;
  totalChildren: number;
  isLastItem?: boolean;
  nodeIndex: number;
  onNodeDrop?: (
    id: string,
    targetId: string,
    targetType: "BEFORE" | "INSIDE" | "AFTER",
    targetIndex: number
  ) => void;
}

export interface TreeNodeDragItem {
  id: string;
}

export interface AdjustedTreeItemStyledProps extends TreeItemProps {
  /**
   * style props
   */
  isDraggedOver: boolean;
}

export interface DroppableLineProps {
  "data-handler-id": any;
  isHovered: boolean;
}
