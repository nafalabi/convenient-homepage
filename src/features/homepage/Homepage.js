import React from "react";
import Greeting from "./Greeeting";
import { selectors } from "./slice";
import { useSelector } from "react-redux";
import styled from "styled-components";

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

const Homepage = () => {
  const imageURI = useSelector(selectors.imageURI);
  const isLoaded = useSelector(selectors.isLoaded);

  return (
    <HomepageRoot
      style={{
        backgroundImage: `url('data:image/jpg;base64,${imageURI}')`,
        opacity: isLoaded ? 1 : 0,
      }}
    >
      <Greeting />
    </HomepageRoot>
  );
};

export default Homepage;
