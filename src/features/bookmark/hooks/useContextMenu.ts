import { useState } from "react";

export interface ClickPositionVal {
  mouseX: null | number;
  mouseY: null | number;
}

const useContextMenu = (openMenuOnClickBlankArea = false) => {
  const [clickedNodeId, setClickedNodeId] = useState<string | null>(null);
  const [clickPosition, setClickPosition] = useState<ClickPositionVal>({
    mouseX: null,
    mouseY: null,
  });
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    const clickedPosition = {
      mouseX: event.clientX - 2,
      mouseY: event.clientY - 4,
    };
    const nodeId = (event.target as Element).getAttribute("data");
    if (!nodeId && !openMenuOnClickBlankArea) return;
    setClickedNodeId(nodeId);
    setClickPosition(clickedPosition);
  };
  const handleClose = () => {
    setClickPosition({
      mouseX: null,
      mouseY: null,
    });
  };

  return { handleClick, handleClose, clickPosition, clickedNodeId };
};

export default useContextMenu;
