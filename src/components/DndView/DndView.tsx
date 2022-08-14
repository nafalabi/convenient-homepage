import oneTimeCallback from "app/utils/oneTimeCallback";
import React, { useMemo } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { CustomDragLayer } from "./CustomDragLayer";
import DragItem from "./DragItem";
import { DndOnMove, RenderDndItem } from "./types";

export interface DndViewProps<TItems extends Array<any>> {
  items: TItems;
  itemIdKeys: keyof TItems[0];
  renderItem: RenderDndItem<TItems[0]>;
  type?: any;
  onMove?: DndOnMove;
}

const DndView = <TItems extends Array<any>>({
  items,
  itemIdKeys,
  renderItem,
  type = "dnditem",
  onMove = (sourceId, destId) => {},
}: DndViewProps<TItems>) => {
  const handleOnMove = useMemo(() => oneTimeCallback(onMove), [onMove]);

  return (
    <DndProvider backend={HTML5Backend}>
      {items.map((item) => (
        <DragItem
          key={item[itemIdKeys]}
          itemData={item}
          id={item[itemIdKeys]}
          renderItem={renderItem}
          type={type}
          onMove={handleOnMove}
        />
      ))}
      <CustomDragLayer
        itemIdKeys={itemIdKeys}
        items={items}
        renderItem={renderItem}
      />
    </DndProvider>
  );
};

export default DndView;
