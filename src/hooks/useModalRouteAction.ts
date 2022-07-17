import sleep from "app/utils/sleep";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Arguments {
  open: () => void;
  close: () => boolean | void | undefined;
}

const useModalRouteAction = ({ open, close }: Arguments) => {
  const navigate = useNavigate();

  useEffect(() => {
    open();

    return () => {
      close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open.toString(), close.toString()]);

  const handleClose = async () => {
    const isPrevented = close();

    if (isPrevented) {
      return;
    }

    await sleep(300);
    navigate("/");
  };

  return { handleClose };
};

export default useModalRouteAction;
