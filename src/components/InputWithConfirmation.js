import {
  ClickAwayListener,
  IconButton,
  Input,
  InputAdornment,
} from "@material-ui/core";
import React, { useState } from "react";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";

const InputWithConfirmation = ({
  onConfirm,
  onCancel,
  value,
  defaultValue,
  ...props
}) => {
  const [focus, setFocus] = useState(false);
  const [realValue, setValue] = useState(value || defaultValue || "");

  const resetState = (e) => {
    setFocus(false);
    setValue("");
    e.target.blur();
    onCancel(e);
  };

  const doConfirm = (e) => {
    if (realValue) {
      onConfirm(realValue);
      resetState(e);
    }
  };

  return (
    <ClickAwayListener onClickAway={() => setFocus(0)}>
      <Input
        value={realValue}
        onChange={(e) => setValue(e.target.value)}
        endAdornment={
          focus || realValue ? (
            <>
              <InputAdornment position="end">
                <IconButton size="small" onClick={doConfirm}>
                  <CheckIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
              <InputAdornment position="end">
                <IconButton size="small" onClick={resetState}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            </>
          ) : null
        }
        onFocus={() => setFocus(1)}
        onKeyDown={(e) => {
          e.stopPropagation();
          switch (e.key) {
            case "Enter":
              doConfirm(e);
              break;
            case "Escape":
              resetState(e);
              break;
            default:
              break;
          }
        }}
        fullWidth
        {...props}
      />
    </ClickAwayListener>
  );
};

InputWithConfirmation.defaultProps = {
  onConfirm: () => {},
  onCancel: () => {},
};

export default React.memo(InputWithConfirmation);
