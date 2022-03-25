import { Identifier } from "dnd-core";

export type RenderDndItem<TItemData> = (props: {
  ["data-handler-id"]: Identifier | null;
  ref: React.Ref<any>;
  style: React.CSSProperties;
  itemData: TItemData;
}) => JSX.Element;

export type DraggableItemMeta = {
  id: any;
};

export type DndOnMove = (sourceId: any, destId: any) => void;
