import { TreeItemProps } from "@mui/lab";
import { FC, SyntheticEvent } from "react";
import { IconType } from "constant";

export type onNodeDropTreeView = (
  id: string,
  targetId: string,
  targetType: "BEFORE" | "INSIDE" | "AFTER",
  targetIndex: number
) => void;

export interface TreeViewProps<TItem> {
  list: TItem[];
  /**
   * Array of ID that are expanded
   */
  expanded: string[];
  /**
   * Current selected / active node
   */
  selected: string;
  /**
   * use react-dnd provider internally (No need to render it in the higher tree) or not
   * @default true
   */
  useInternalDndProvider?: boolean;
  /**
   * Callback function that will be called upon toggling node
   */
  onNodeToggle?: (e: SyntheticEvent, ids: string[]) => void;
  /**
   * Callback function that will be called upon selecting node
   */
  onNodeSelect?: (e: SyntheticEvent, id: string) => void;
  /**
   * Callback function that will be called upon drag n droping a node
   */
  onNodeDrop?: onNodeDropTreeView;
  /**
   * Callback function that will transform each row in the list to be renderable by the TreeView
   */
  resolveData: (row: TItem) => {
    id: number;
    label: string;
    iconType: IconType;
    iconId: string;
    hasChildren: boolean;
    children?: TItem[];
    expanding?: boolean;
    dontRender?: boolean;
  };
}

export interface TreeNodeProps extends TreeItemProps {
  bgColor?: string;
  color?: string;
  labelIcon: FC<{ className?: string }>;
  labelText: string;
  totalChildren: number;
  isLastItem?: boolean;
  nodeIndex: number;
  onNodeDrop?: onNodeDropTreeView;
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
