import { use, Suspense } from 'react';
import { ErrorBoundary } from "react-error-boundary";

const FetchComponent = ({ promise, Success, Loading, Error }) => {
  const data = use(promise);
  return (
    <ErrorBoundary fallbackRender={Error}>
      <Suspense fallback={Loading()}>
        {Success(data)}
      </Suspense>
    </ErrorBoundary>
  )
};

export default FetchComponent;