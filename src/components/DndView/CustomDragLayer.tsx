import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { CSSProperties, useMemo } from "react";
import type { XYCoord } from "react-dnd";
import { useDragLayer } from "react-dnd";
import type { DndViewProps } from "./DndView";
import type { DraggableItemMeta } from "./types";

const layerStyles: CSSProperties = {
  position: "fixed",
  pointerEvents: "none",
  zIndex: 100,
  left: 0,
  top: 0,
  width: "100%",
  height: "100%",
};

function getItemStyles(
  initialOffset: XYCoord | null,
  currentOffset: XYCoord | null
) {
  if (!initialOffset || !currentOffset) {
    return {
      display: "none",
    };
  }

  let { x, y } = currentOffset;

  const transform = `translate(${x}px, ${y}px)`;

  return {
    transform,
    WebkitTransform: transform,
  };
}

export type CustomDragLayerProps<TItems extends Array<any>> = Omit<
  DndViewProps<TItems>,
  "type" | "onMove"
>;

export const CustomDragLayer = <TItems extends Array<any>>({
  renderItem,
  items,
  itemIdKeys,
}: CustomDragLayerProps<TItems>) => {
  const mountPointEl = useRef<HTMLDivElement | null>(null);

  const { isDragging, item, initialOffset, currentOffset } = useDragLayer(
    (monitor) => ({
      item: monitor.getItem() as DraggableItemMeta,
      initialOffset: monitor.getInitialSourceClientOffset(),
      currentOffset: monitor.getSourceClientOffset(),
      isDragging: monitor.isDragging(),
    })
  );

  const itemData = useMemo(() => {
    if (!item) return;
    if (items.length === 0) return;

    return items.find((data) => {
      const id = data[itemIdKeys];
      return id === item.id;
    });
  }, [items, item, itemIdKeys]);

  // Mount point creation
  useEffect(() => {
    if (!mountPointEl.current) {
      const el = document.createElement("div");
      mountPointEl.current = el;
      document.body.appendChild(mountPointEl.current);
    }
    return () => {
      if (mountPointEl.current) document.body.removeChild(mountPointEl.current);
    };
  }, []);

  if (!isDragging || !mountPointEl.current || !itemData) {
    return null;
  }

  return createPortal(
    <div style={layerStyles} className="layer-styles">
      <div style={getItemStyles(initialOffset, currentOffset)}>
        {renderItem({
          itemData,
          style: {},
        })}
      </div>
    </div>,
    mountPointEl.current
  );
};
