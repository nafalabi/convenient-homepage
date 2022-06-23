import { CloudUpload } from "@mui/icons-material";
import { Box } from "@mui/material";
import throttle from "app/utils/throttle";
import React, { useCallback, useRef, useState } from "react";

export interface DroppableFileInputProps {
  onFileChange?: (file: FileList | null) => void;
  multiple?: boolean;
  accept?: string;
}

const DroppableFileInput = ({
  onFileChange,
  multiple,
  accept,
}: DroppableFileInputProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (onFileChange) onFileChange(files);
  };

  const handleDropFiles = (event: React.DragEvent<HTMLDivElement>) => {
    const files = event.dataTransfer.files;
    if (onFileChange) onFileChange(files);
    setIsDraggingOver(false);
  };

  const handleDragOver = useCallback(
    (value) =>
      throttle((event: React.DragEvent<HTMLDivElement>) => {
        setIsDraggingOver(value);
      }, 200),
    []
  );

  return (
    <Box
      sx={(theme) => ({
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        p: theme.spacing(3),
        border: "1px dashed",
        borderRadius: theme.spacing(1),
        cursor: "pointer",
        userSelect: "none",
        backgroundColor: isDraggingOver ? theme.palette.info.main : "#fff1",
        color: isDraggingOver ? theme.palette.info.contrastText : "",
      })}
      onClick={handleClick}
      onDrop={handleDropFiles}
      onDragOver={handleDragOver(true)}
      onDragLeave={handleDragOver(false)}
    >
      <CloudUpload fontSize="large" />
      <Box>Drag and drop file here or click</Box>
      <input
        ref={fileInputRef}
        type="file"
        style={{ display: "none" }}
        multiple={multiple}
        onChange={handleFileChange}
        accept={accept}
      />
    </Box>
  );
};

export default DroppableFileInput;
