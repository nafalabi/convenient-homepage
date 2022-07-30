import React, { Suspense, SuspenseProps } from "react";
import LoaderCallback, { LoaderCallbackProps } from "./LoaderCallback";

interface LazyComponentProps extends Omit<LoaderCallbackProps, "children"> {
  Component: ReturnType<typeof React.lazy>;
  fallback?: SuspenseProps["fallback"];
  [x: string]: any;
}

const LazyComponent: React.FunctionComponent<LazyComponentProps> = ({
  Component,
  fallback = null,
  onComplete,
  onLoad,
  ...props
}) => {
  return (
    <Suspense fallback={fallback}>
      <LoaderCallback onLoad={onLoad} onComplete={onComplete}>
        <Component {...props} />
      </LoaderCallback>
    </Suspense>
  );
};

export default LazyComponent;

