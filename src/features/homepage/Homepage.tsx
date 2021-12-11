import React, { useEffect } from "react";
import Greeting from "./Greeeting";
import { actions } from "./slice";
import { useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";
import { useLiveQuery } from "dexie-react-hooks";
import dexieDB from "../../app/storage/dexie/db";

const HomepageRoot = styled.div`
  background-size: cover;
  height: 100vh;
  width: 100vw;
  left: 0;
  top: 0;
  margin: 0;
  opacity: 0;
  transition: opacity 0.5s ease;

  &.loaded {
    opacity: 1;
  }

  &::before {
    content: " ";
    background-color: rgba($color: #000, $alpha: 0.2);
    height: 100vh;
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
  }
`;

const Homepage = (props: { alreadySetup: boolean }) => {
  const dispatch = useDispatch();
  const initialized = useSelector(({ homepage }) => homepage.initialized);

  const imageURI = useLiveQuery<string, string>(
    async () => {
      const background = await dexieDB.background
        .orderBy("expireat")
        .reverse()
        .first();
      return background?.content ?? "";
    },
    [initialized],
    ""
  );

  useEffect(() => {
    dispatch(actions.initialize());
  }, [dispatch]);

  return (
    <HomepageRoot
      style={{
        backgroundImage: `url('data:image/jpg;base64,${imageURI}')`,
        opacity: initialized && imageURI !== "" ? 1 : 0,
      }}
    >
      {props.alreadySetup && <Greeting />}
    </HomepageRoot>
  );
};

export default Homepage;
