import React, { useEffect, useMemo, useState } from "react";
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

const greetings = [
  "What's your main focus for today?",
  "How can I help you?",
  "What a lovely day!",
  "You sure love to work :)",
  "Consider to have a break, if you haven't",
  "I'm sure you have a great plan today!",
  "Make sure to take a note :)",
  "Browsing can be really tedious, don't you think?",
];

const Greeting = () => {
  const username = useSelector(({ homepage }) => homepage.username);
  const [time, setTime] = useState<string | undefined>();
  const [greeting, setGreeting] = useState("");
  const greetingText = useMemo(
    () => greetings[Math.floor(Math.random() * greetings.length)],
    []
  );

  useEffect(() => {
    const action = () => {
      const dt = DateTime.now();
      let timeString = dt.toFormat("HH:mm");
      let greetingTime = "";

      const curHour = dt.hour;

      if (curHour >= 0 && curHour <= 5) {
        greetingTime = "Night";
      } else if (curHour >= 6 && curHour <= 11) {
        greetingTime = "Morning";
      } else if (curHour === 12) {
        greetingTime = "Noon";
      } else if (curHour >= 13 && curHour <= 16) {
        greetingTime = "Afternoon";
      } else if (curHour >= 17 && curHour <= 19) {
        greetingTime = "Evening";
      } else if (curHour >= 20 && curHour <= 24) {
        greetingTime = "Night";
      }

      setTime(timeString);
      setGreeting(greetingTime);
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
        <h3>{greetingText}</h3>
      </div>
    </GreetingRoot>
  );
};

export default Greeting;
