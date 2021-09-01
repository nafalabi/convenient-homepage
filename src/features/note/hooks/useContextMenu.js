import { useState } from "react";

const useContextMenu = (openMenuOnClickBlankArea = false) => {
  const [clickedNodeId, setClickedNodeId] = useState(null); // folder or bookmark
  const [clickPosition, setClickPosition] = useState({
    mouseX: null,
    mouseY: null,
  });
  const onContextMenu = (event) => {
    console.log("clicked");
    event.preventDefault();
    const clickedPosition = {
      mouseX: event.clientX - 2,
      mouseY: event.clientY - 4,
    };
    const nodeId = event.target.getAttribute("data");
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
