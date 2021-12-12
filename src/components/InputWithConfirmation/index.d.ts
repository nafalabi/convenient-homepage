import { InputProps } from "@mui/material";
import { SyntheticEvent } from "react";

interface InputWithConfirmationProps extends InputProps {
  onConfirm: (value: string) => void;
  onCancel?: (e: SyntheticEvent) => any;
  value?;
  defaultValue?;
}

const InputWithConfirmation: (
  props: InputWithConfirmationProps
) => JSX.Element<InputWithConfirmationProps>;

export default InputWithConfirmation;
