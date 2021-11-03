import { useCallback, useEffect } from "react";

const useListenEventFromRef = (type, ref, callback) => {
  const eventListener = useCallback(callback, [callback]);

  useEffect(() => {
    const element = ref.current;

    if (element) {
      element.addEventListener(type, eventListener);
    }

    return () => element.removeEventListener(type, eventListener);
  }, [type, ref, eventListener]);
};

export default useListenEventFromRef;
