// import { INote } from "../../app/storage/dexie/Note";
import { SvgIconComponent } from "@mui/icons-material";
import { TreeItemProps } from "@mui/lab";
import { FC, SyntheticEvent } from "react";
import Note from "../../app/storage/dexie/Note";

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
}

export interface TreeNodeProps extends TreeItemProps {
  bgColor?: string;
  color?: string;
  labelIcon: FC & SvgIconComponent;
  labelText: string;
  totalChildren: number;
  isLastItem?: boolean;
}

export interface TreeNodeDragItem {
  id: any;
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
