import React, { Component } from "react";
import moment from "moment";
import me from "../../config/me.json";
import styled from "styled-components";

const GreatingRoot = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  width: 80vw;

  & .greeting {
    font-family: "Montserrat", sans-serif;
    color: white;
    font-size: 3vw;
  }
`;

export default class Greeting extends Component {
  render() {
    const curHour = parseInt(moment().format("HH"));
    let greetingVal = "";

    if (curHour >= 1 && curHour <= 5) {
      greetingVal = "Night";
    } else if (curHour >= 6 && curHour <= 11) {
      greetingVal = "Morning";
    } else if (curHour === 12) {
      greetingVal = "Noon";
    } else if (curHour >= 13 && curHour <= 16) {
      greetingVal = "Afternoon";
    } else if (curHour >= 17 && curHour <= 19) {
      greetingVal = "Evening";
    } else if (curHour >= 20 && curHour <= 24) {
      greetingVal = "Night";
    }

    return (
      <GreatingRoot>
        <div className="greeting">
          <h1>
            Good {greetingVal}, {me.firstName}
          </h1>
          <h3>What is your main focus for today?</h3>
        </div>
      </GreatingRoot>
    );
  }
}
