import React, { useState } from "react";

interface ClickPositionVal {
  mouseX: null | number;
  mouseY: null | number;
}

const useContextMenu = (openMenuOnClickBlankArea = false) => {
  const [clickedNodeId, setClickedNodeId] = useState<string | null>(null); // folder or bookmark
  const [clickPosition, setClickPosition] = useState<ClickPositionVal>({
    mouseX: null,
    mouseY: null,
  });

  const onContextMenu = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    const clickedPosition = {
      mouseX: event.clientX - 2,
      mouseY: event.clientY - 4,
    };
    const el = event.target as Element;
    const nodeId = el.getAttribute("data");
    if (!nodeId && !openMenuOnClickBlankArea) return;
    setClickedNodeId(nodeId);
    setClickPosition(clickedPosition);
  };

  const handleCloseContextMenu = () => {
    setClickPosition({
      mouseX: null,
      mouseY: null,
    });
  };

  return {
    onContextMenu,
    handleCloseContextMenu,
    clickPosition,
    clickedNodeId,
  };
};

export default useContextMenu;
