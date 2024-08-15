import { Topic } from "@/pages/Topic";
import ErrorPage from "@pages/ErrorPage";
import { Home } from "@pages/Home";
import { createBrowserRouter } from "react-router-dom";

export const routes = [
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/:id",
    element: <Topic />,
  }
]

export const router = createBrowserRouter(routes);