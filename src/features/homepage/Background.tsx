import React from "react";
import { useSelector } from "react-redux";
import ImageInfo from "./widgets/ImageInfo/ImageInfo";
import useSubscribeBackground from "./hooks/useSubscribeBackground";
import LazyWidgets from "./LazyWidgets";
import DrawerTogglerButton from "features/drawer/DrawerTogglerButton";
import SearchComponent from "features/search/SearchComponent";
import { styled } from "@mui/material";

const HomepageRoot = styled("div")`
  background-size: cover;
  height: 100vh;
  width: 100vw;
  left: 0;
  top: 0;
  margin: 0;
  opacity: 0;
  transition: background-image 0.5s ease, opacity 0.5s ease;

  &::before {
    content: " ";
    transition: background-image 0.5s ease;
    opacity: 0.2;
    height: 100vh;
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
  }
`;

const Background = (props: { alreadySetup: boolean }) => {
  const initialized = useSelector(({ homepage }) => homepage.initialized);

  const { backgroundInfo, imageUrl, isImageLoaded } =
    useSubscribeBackground(initialized);

  return (
    <HomepageRoot
      sx={{
        opacity: Number(isImageLoaded),
        backgroundImage: `url(${imageUrl})`,
        "&::before": {
          backgroundColor: isImageLoaded ? "#000" : "transparent",
        },
      }}
    >
      {props.alreadySetup && (
        <>
          <div className="background-content">
            <LazyWidgets imageIsLoaded={isImageLoaded} />
          </div>
          <DrawerTogglerButton isImageLoaded={isImageLoaded} />
          <SearchComponent />
          <ImageInfo
            isImageLoaded={isImageLoaded}
            provider={backgroundInfo?.provider}
            photographer={backgroundInfo?.photographer}
            photoLocation={backgroundInfo?.photo_location}
            description={backgroundInfo?.description}
            sourceLink={backgroundInfo?.utm_link}
            photographerPageLink={backgroundInfo?.photographer_utm_link}
          />
        </>
      )}
    </HomepageRoot>
  );
};

export default Background;
