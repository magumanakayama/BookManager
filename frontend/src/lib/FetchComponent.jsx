import { use, Suspense } from 'react';
import { ErrorBoundary } from "react-error-boundary";

// ErrorBoundary直下に子コンポーネントを置くためのラッパー
//// Success(data)を直下に置くとcatchできないため、SuccessWrapperを挟む
const SuccessWrapper = ({ promise, Success }) => {
  const data = use(promise);
  return Success(data);
};

const FetchComponent = ({ promise, Success, Loading, Error }) => {
  return (
    <ErrorBoundary fallbackRender={Error}>
      <Suspense fallback={Loading()}>
        <SuccessWrapper promise={promise} Success={Success} />
      </Suspense>
    </ErrorBoundary>
  )
};

export default FetchComponent;