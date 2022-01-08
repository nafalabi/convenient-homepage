import React, { useEffect } from "react";
import Greeting from "./Greeeting";
import { actions } from "./slice";
import { useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";
import { useLiveQuery } from "dexie-react-hooks";
import ImageSource from "./ImageSource";
import DexieAPI from "app/api/dexie-api";
import { IBackgroundImage } from "app/storage/dexie/BackgroundImage";

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
`;

const blankBackground: IBackgroundImage = {
  image_url:
    "data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==",
};

const Homepage = (props: { alreadySetup: boolean }) => {
  const dispatch = useDispatch();
  const initialized = useSelector(({ homepage }) => homepage.initialized);

  const background = useLiveQuery(
    async () => {
      const result = await DexieAPI.backgroundimage.getCurActiveImage();
      return result ? result : blankBackground;
    },
    [initialized],
    blankBackground
  );

  useEffect(() => {
    dispatch(actions.initialize());
  }, [dispatch]);

  return (
    <HomepageRoot
      style={{
        backgroundImage: `url(${background?.image_url ?? ""})`,
        opacity: initialized && background !== undefined ? 1 : 0,
      }}
    >
      {props.alreadySetup && (
        <>
          <Greeting />
          <ImageSource
            provider={background?.provider}
            photographer={background?.photographer}
            photoLocation={background?.photo_location}
            sourceLink={background?.utm_link}
          />
        </>
      )}
    </HomepageRoot>
  );
};

export default Homepage;
