import React, { Suspense, SuspenseProps } from "react";

interface LazyComponentProps {
  Component: ReturnType<typeof React.lazy>;
  fallback?: SuspenseProps["fallback"];
}

const LazyComponent = ({ Component, fallback = null }: LazyComponentProps) => {
  return (
    <Suspense fallback={fallback}>
      <Component />
    </Suspense>
  );
};

export default LazyComponent;
