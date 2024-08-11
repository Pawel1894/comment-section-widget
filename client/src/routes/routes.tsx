import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../error-page";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/:id",
    element: <div>Dynamic route</div>,
  }
]);