import { RefObject } from "react";

type CompositionComponent = (props: {
  dialogRef: RefObject<HTMLDivElement>;
}) => JSX.Element<{ dialogRef: any }>;

export interface PanelWithSidebarProps {
  open: boolean;
  toggle: () => void;
  title: string;
  SidebarComponent: CompositionComponent;
  ContentComponent: CompositionComponent;
  ToolbarItemComponent?: CompositionComponent;
}

const PanelWithSidebar: (
  props: PanelWithSidebarProps
) => JSX.Element<PanelWithSidebarProps>;

export default PanelWithSidebar;
