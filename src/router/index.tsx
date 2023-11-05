import { createBrowserRouter, RouteObject } from "react-router-dom";
import NotFound from "../pages/NotFound.tsx";
import MainLayout from "../layout";
import Main from "../pages/Main.tsx";

export enum Routes {
  MAIN = "/flights-board",
}

const routes: RouteObject[] = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: Routes.MAIN,
        element: <Main />,
      },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
];

export const router = createBrowserRouter(routes);

export const routelist = routes.map((r) => r.path);
