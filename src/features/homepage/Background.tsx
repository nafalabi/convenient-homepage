import React, { useEffect } from "react";
import Greeting from "./Greeeting";
import { actions } from "./slice";
import { useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";
import { useLiveQuery } from "dexie-react-hooks";
import ImageSource from "./ImageSource";
import InternalAPI from "app/api/internal-api";
import { IBackgroundImage } from "app/storage/dexie/BackgroundImage";
import SearchField from "./SearchField";
import Clock from "./Clock";

const HomepageRoot = styled.div`
  background-size: cover;
  height: 100vh;
  width: 100vw;
  left: 0;
  top: 0;
  margin: 0;
  opacity: 0;
  transition: background-image 0.5s ease;

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

const blankBackground: IBackgroundImage = {
  image_url:
    "data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==",
};

const Background = (props: { alreadySetup: boolean }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.initialize());
  }, [dispatch]);

  const initialized = useSelector(({ homepage }) => homepage.initialized);

  const background = useLiveQuery(
    async () => {
      const result = await InternalAPI.backgroundimage.getCurActiveImage();
      return result ? result : blankBackground;
    },
    [initialized],
    blankBackground
  );

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
          </div>
          <ImageSource
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
