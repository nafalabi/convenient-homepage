import { useState } from "react";

const useSidebarContextMenu = () => {
  const [clickedNodeId, setClickedNodeId] = useState(null); // folder or bookmark
  const [clickPosition, setClickPosition] = useState({
    mouseX: null,
    mouseY: null,
  });
  const handleClick = (event) => {
    event.preventDefault();
    const clickedPosition = {
      mouseX: event.clientX - 2,
      mouseY: event.clientY - 4,
    };
    const nodeId = event.target.getAttribute("data");
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

export default useSidebarContextMenu;
