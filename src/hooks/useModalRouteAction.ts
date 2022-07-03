import sleep from "app/utils/sleep";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Arguments {
  open: () => void;
  close: () => void;
}

const useModalRouteAction = ({ open, close }: Arguments) => {
  const navigate = useNavigate();

  useEffect(() => {
    open();

    return () => {
      close();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = async () => {
    close();
    await sleep(300);
    navigate("/");
  };

  return { handleClose };
};

export default useModalRouteAction;
