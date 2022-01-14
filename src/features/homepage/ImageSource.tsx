import React from "react";
import styled from "@emotion/styled";
import {
  ImageOutlined,
  LocationOnOutlined,
  PhotoCameraOutlined,
} from "@mui/icons-material";
import { ImageProvider } from "constant";
import getImgProviderName from "app/utils/getImgProviderName";

const RootComp = styled.div`
  position: fixed;
  bottom: 0;
  left: 1rem;
  padding-bottom: 1rem;
  color: white;
  user-select: none;
  cursor: pointer;

  & > div {
    display: flex;
    transition: all 0.5s ease;

    &.description {
      transform: translate3d(0, 26px, 5px);
    }
    &.photographer,
    &.location {
      opacity: 0;
    }

    & > svg {
      margin-right: 0.2rem;
    }
  }

  &:hover {
    & .description {
      transform: translate3d(0, 0, 0) !important;
    }
    & .photographer,
    & .location {
      opacity: 1;
    }
  }
`;

interface Props {
  provider?: ImageProvider;
  photographer?: string;
  photoLocation?: string;
  description?: string;
  sourceLink?: string;
}

const ImageSource = ({
  provider,
  photographer,
  photoLocation,
  description,
  sourceLink,
}: Props) => {
  description = description ?? "";
  const providerName = getImgProviderName(provider);

  if (provider === undefined) return null;

  const openImageSource = () => {
    window.open(sourceLink, "_blank");
  };

  return (
    <RootComp onClick={openImageSource}>
      {description && (
        <div className="description">
          <ImageOutlined />
          {description.substring(0, 60)}
          {description.length > 60 ? " ..." : ""}
        </div>
      )}
      <div className="photographer">
        <PhotoCameraOutlined />
        {`${photographer} (${providerName})`}
      </div>
      {photoLocation && (
        <div className="location">
          <LocationOnOutlined />
          {photoLocation}
        </div>
      )}
    </RootComp>
  );
};

export default ImageSource;
