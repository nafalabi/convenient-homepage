import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { DateTime } from "luxon";
import { useSelector } from "react-redux";

const ClockRoot = styled.p`
  color: white;
  font-size: 9rem;
  margin: 0;
  text-align: center;
  font-family: "Roboto", sans-serif;
  line-height: 1;
`;

const Clock = () => {
  const showClock = useSelector(
    ({ settings }) => settings.generalSettings.showClock
  );
  const [time, setTime] = useState<string | undefined>();

  useEffect(() => {
    const action = () => {
      const dt = DateTime.now();
      let timeString = dt.toFormat("HH:mm");
      setTime(timeString);
    };

    const interval = setInterval(action, 30000);
    action();

    return () => clearInterval(interval);
  }, []);

  if (!showClock) return null;

  return <ClockRoot>{time}</ClockRoot>;
};

export default Clock;
