import ErrorPage from "@pages/ErrorPage";
import { Home } from "@pages/Home";
import { createBrowserRouter } from "react-router-dom";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/:id",
    element: <div>Dynamic route</div>,
  }
]);