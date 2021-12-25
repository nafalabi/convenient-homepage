import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import { DateTime } from "luxon";

const GreetingRoot = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  width: 80vw;
  user-select: none;

  & .clock {
    color: white;
    font-size: 9rem;
    margin: 0;
    text-align: center;
    font-family: "Roboto", sans-serif;
    line-height: 1;
  }

  & .greeting {
    font-family: "Montserrat", sans-serif;
    color: white;
    /* font-size: 3vw; */
    font-size: 2rem;
    text-align: center;

    & h1 {
      margin: 0;
      font-weight: 100;
    }

    & h3 {
      margin: 0;
      font-weight: 100;
    }
  }
`;

const Greeting = () => {
  const username = useSelector(({ homepage }) => homepage.username);
  const [time, setTime] = useState<string | undefined>();
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const action = () => {
      const dt = DateTime.now();
      let timeString = dt.toFormat("HH:mm");
      let greetingVal = "";

      const curHour = dt.hour;

      if (curHour >= 0 || curHour <= 5) {
        greetingVal = "Night";
      } else if (curHour >= 6 || curHour <= 11) {
        greetingVal = "Morning";
      } else if (curHour === 12) {
        greetingVal = "Noon";
      } else if (curHour >= 13 || curHour <= 16) {
        greetingVal = "Afternoon";
      } else if (curHour >= 17 || curHour <= 19) {
        greetingVal = "Evening";
      } else if (curHour >= 20 || curHour <= 24) {
        greetingVal = "Night";
      }

      setTime(timeString);
      setGreeting(greetingVal);
    };

    const interval = setInterval(action, 30000);
    action();

    return () => clearInterval(interval);
  }, []);

  return (
    <GreetingRoot>
      <p className="clock">{time}</p>
      <div className="greeting">
        <h1>
          Good {greeting}, {username}
        </h1>
        <h3>What is your main focus for today?</h3>
      </div>
    </GreetingRoot>
  );
};

export default Greeting;
