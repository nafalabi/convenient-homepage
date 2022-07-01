import React from "react";
import styled from "@emotion/styled";
import {
  ImageOutlined,
  // LocationOnOutlined,
  PhotoCameraOutlined,
  RotateLeftOutlined,
} from "@mui/icons-material";
import { ImageProvider } from "app/constant";
import getImgProviderName from "app/utils/getImgProviderName";
import AppController from "app/controller";

const RootComp = styled.div`
  position: fixed;
  bottom: 0;
  left: 1rem;
  padding-bottom: 1rem;
  color: rgba(255, 255, 255, 0.8);
  user-select: none;

  & > div {
    display: flex;
    transition: all 0.5s ease;
    cursor: pointer;

    &: hover {
      color: white;
    }

    &.description {
      transform: translate3d(0, 52px, 5px);
    }
    &.photographer {
      transform: translate3d(0, 26px, 5px);
    }
    &.photographer,
    /* &.location, */
    &.change-image-action {
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
    & .photographer {
      transform: translate3d(0, 0, 0) !important;
    }
    & .photographer,
    /* & .location, */
    & .change-image-action {
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
  photographerPageLink?: string;
}

const ImageInfo = ({
  provider,
  photographer,
  photoLocation,
  description,
  sourceLink,
  photographerPageLink,
}: Props) => {
  description = description ?? "";
  const providerName = getImgProviderName(provider);

  if (provider === undefined) return null;

  const openImageSource = () => {
    window.open(sourceLink, "_blank");
  };

  const openPhotographerPage = () => {
    window.open(photographerPageLink ?? sourceLink, "_blank");
  };

  const handleChangeImage = () => {
    AppController.backgroundimage.cycleBackground();
  };

  return (
    <RootComp>
      {description && (
        <div className="description" onClick={openImageSource}>
          <ImageOutlined />
          {description.substring(0, 60)}
          {description.length > 60 ? " ..." : ""}
        </div>
      )}
      <div className="photographer" onClick={openPhotographerPage}>
        <PhotoCameraOutlined />
        {`${photographer} (${providerName})`}
      </div>
      {/* {photoLocation && (
        <div className="location">
          <LocationOnOutlined />
          {photoLocation}
        </div>
      )} */}
      <div className="change-image-action" onClick={handleChangeImage}>
        <RotateLeftOutlined />
        Change Image
      </div>
    </RootComp>
  );
};

export default ImageInfo;
