import React from "react";
import Greeting from "./widgets/Greeting/Greeeting";
import { useSelector } from "react-redux";
import styled from "@emotion/styled";
import ImageInfo from "./widgets/ImageInfo/ImageInfo";
import SearchField from "./widgets/SearchField/SearchField";
import Clock from "./widgets/Clock/Clock";
import QuickLinks from "./widgets/QuickLinks/QuickLinks";
import useSubscribeBackground from "./hooks/useSubscribeBackground";

const HomepageRoot = styled.div`
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
    background-color: #000;
    opacity: 0.2;
    height: 100vh;
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
  }

  & .background-content {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    width: 80vw;
    user-select: none;
  }
`;

const Background = (props: { alreadySetup: boolean }) => {
  const initialized = useSelector(({ homepage }) => homepage.initialized);

  const background = useSubscribeBackground(initialized);

  return (
    <HomepageRoot
      style={{
        backgroundImage: `url(${background?.image_url ?? ""})`,
        opacity: initialized && background !== undefined ? 1 : 0,
      }}
    >
      {props.alreadySetup && (
        <>
          <div className="background-content">
            <Clock />
            <Greeting />
            <SearchField />
            <QuickLinks />
          </div>
          <ImageInfo
            provider={background?.provider}
            photographer={background?.photographer}
            photoLocation={background?.photo_location}
            description={background?.description}
            sourceLink={background?.utm_link}
            photographerPageLink={background?.photographer_utm_link}
          />
        </>
      )}
    </HomepageRoot>
  );
};

export default Background;
