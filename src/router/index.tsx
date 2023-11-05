import { createBrowserRouter } from "react-router-dom";
import Main from "../pages/Main.tsx";
import NotFound from "../pages/NotFound.tsx";

export enum Routes {
  MAIN= '/',
}

const routes = [
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export const router = createBrowserRouter(routes);

export const routelist = routes.map((r) => r.path);

