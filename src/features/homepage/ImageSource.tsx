import React from "react";
import styled from "@emotion/styled";
import {
  ImageOutlined,
  LocationOnOutlined,
  PhotoCameraOutlined,
} from "@mui/icons-material";
import { ImageProvider } from "constant";

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
  const providerString = convProviderToString(provider);

  if (provider === undefined) return null;

  const openImageSource = () => {
    window.open(sourceLink, "_blank");
  };

  return (
    <RootComp onClick={openImageSource}>
      {description && (
        <div className="description">
          <ImageOutlined />
          {description}
        </div>
      )}
      <div className="photographer">
        <PhotoCameraOutlined />
        {`${photographer} (${providerString})`}
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

const convProviderToString = (provider?: ImageProvider) => {
  switch (provider) {
    case ImageProvider.BING:
      return "Bing";
    case ImageProvider.PIXABAY:
      return "Pixabay";
    case ImageProvider.UNSPLASH:
      return "Unsplash";
    default:
      return "";
  }
};
