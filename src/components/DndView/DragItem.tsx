import React, { useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";
import { Identifier } from "dnd-core";
import { RenderDndItem, DraggableItemMeta } from "./types";
import { getEmptyImage } from "react-dnd-html5-backend";

export interface DragItemProps<TId, TItemData> {
  type: Identifier;
  id: TId;
  itemData: TItemData;
  renderItem: RenderDndItem<TItemData>;
  onMove: (...args: any[]) => {};
}

const DragItem = <TId, TItemData>({
  type,
  id,
  itemData,
  renderItem,
  onMove,
}: DragItemProps<TId, TItemData>) => {
  const [dragProps, dragRef, preview] = useDrag(
    {
      type: type,
      canDrag: true,
      item: { id } as DraggableItemMeta,
      collect: (monitor) => {
        return {
          handlerId: monitor.getHandlerId(),
          isDragging: monitor.isDragging(),
        };
      },
    },
    [id]
  );

  const [, dropRef] = useDrop({
    accept: type,
    hover: (item: DraggableItemMeta, monitor) => {
      if (item.id !== id) {
        onMove(item.id, id);
      }
    },
    collect: (monitor) => {
      return {
        handlerId: monitor.getHandlerId(),
        isHovered: monitor.isOver({ shallow: true }),
      };
    },
  });

  const style = React.useMemo(
    () => ({
      opacity: dragProps.isDragging ? 0 : 1,
    }),
    [dragProps.isDragging]
  );

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);

  return renderItem({
    "data-handler-id": dragProps.handlerId,
    ref: (ref) => {
      dragRef(ref);
      dropRef(ref);
    },
    itemData,
    style,
  });
};

export default DragItem;
