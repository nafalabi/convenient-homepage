import { TimeCycleUnits } from "app/constant";

const convToMin = (unit: TimeCycleUnits, val: number) => {
  let result = 0;
  switch (unit) {
    case "weeks":
      result = val * 60 * 24 * 7;
      break;
    case "days":
      result = val * 60 * 24;
      break;
    case "hours":
      result = val * 60;
      break;
    case "minutes":
      result = val;
      break;
    default:
      break;
  }

  return result;
};

export default convToMin;
