import React, { useEffect, useMemo, useState } from "react";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import { DateTime } from "luxon";

const GreetingRoot = styled.div`
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
  const [greeting, setGreeting] = useState("");
  const greetingText = useMemo(
    () => greetings[Math.floor(Math.random() * greetings.length)],
    []
  );

  useEffect(() => {
    const action = () => {
      const dt = DateTime.now();
      let greetingTime = "";

      const curHour = dt.hour;

      if (curHour >= 0 && curHour <= 5) {
        greetingTime = "Evening";
      } else if (curHour >= 6 && curHour <= 11) {
        greetingTime = "Morning";
      } else if (curHour === 12) {
        greetingTime = "Noon";
      } else if (curHour >= 13 && curHour <= 16) {
        greetingTime = "Afternoon";
      } else if (curHour >= 17 && curHour <= 19) {
        greetingTime = "Evening";
      } else if (curHour >= 20 && curHour <= 24) {
        greetingTime = "Evening";
      }

      setGreeting(greetingTime);
    };

    const interval = setInterval(action, 30000);
    action();

    return () => clearInterval(interval);
  }, []);

  return (
    <GreetingRoot>
      <h1>
        Good {greeting}, {username}
      </h1>
      <h3>{greetingText}</h3>
    </GreetingRoot>
  );
};

export default Greeting;
