import { useLayoutEffect } from "react";

export interface LoaderCallbackProps {
  onLoad?: () => void;
  onComplete?: () => void;
  children: any;
}

const LoaderCallback = ({
  onLoad,
  onComplete,
  children,
}: LoaderCallbackProps) => {
  if (onLoad) {
    onLoad();
  }

  useLayoutEffect(() => {
    if (onComplete) {
      onComplete();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return children;
};

export default LoaderCallback;
