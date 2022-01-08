import React from "react";
import styled from "@emotion/styled";
import { LocationOnOutlined, PhotoCameraOutlined } from "@mui/icons-material";
import { ImageProvider } from "constant";

const RootComp = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  color: white;
  user-select: none;
  cursor: pointer;

  & > div {
    display: flex;

    & > svg {
      margin-right: 0.2rem;
    }
  }
`;

interface Props {
  provider?: ImageProvider;
  photographer?: string;
  photoLocation?: string;
  sourceLink?: string;
}

const ImageSource = ({
  provider,
  photographer,
  photoLocation,
  sourceLink,
}: Props) => {
  const providerString = convProviderToString(provider);

  if (provider === undefined) return null;

  const openImageSource = () => {
    window.open(sourceLink, "_blank");
  };

  return (
    <RootComp onClick={openImageSource}>
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
