import ErrorPage from "@pages/error-page";
import { Home } from "@pages/home";
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