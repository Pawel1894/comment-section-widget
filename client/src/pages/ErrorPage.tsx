import { useRouteError } from "react-router-dom";

interface RouteError {
  statusText?: string;
  data?: string;
}

function hasErrorObject(routeError: unknown): routeError is {
  error: unknown;
} {
  return typeof routeError === 'object' && routeError !== null && 'error' in routeError;
}

function isCorrectErrorObject(routeError: unknown): routeError is RouteError {
  if(!hasErrorObject(routeError)) {
    return false;
  }

  return 'statusText' in routeError && 'data' in routeError;
}

export default function ErrorPage() {
  const routeError = useRouteError() as RouteError;

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      {isCorrectErrorObject(routeError) && 
      <p>
        <i>{routeError.data ?? routeError.statusText}</i>
      </p>
      }
    </div>
  );
}