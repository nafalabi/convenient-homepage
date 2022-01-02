import React from "react";
import styled from "@emotion/styled";
import { LocationOnOutlined, PhotoCameraOutlined } from "@mui/icons-material";

const RootComp = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  color: white;

  & > div {
    display: flex;

    & > svg {
      margin-right: 0.2rem;
    }
  }
`;

const ImageSource = () => {
  return (
    <RootComp>
      <div className="photographer">
        <PhotoCameraOutlined />
        Johann Siemens (Unsplash)
      </div>
      <div className="location">
        <LocationOnOutlined />
        Deutschland, Elsenfeld
      </div>
    </RootComp>
  );
};

export default ImageSource;
