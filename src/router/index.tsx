import { createBrowserRouter, RouteObject } from "react-router-dom";
import NotFound from "../pages/NotFound.tsx";
import App from "../App.tsx";
import Main from "../pages/flightsBoard/FlightsBoard.tsx";
import BookingBoard from "../pages/BookingBoard.tsx";

export enum Routes {
  MAIN = "/flights-board",
  BOOKING= "/booking"
}

const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: Routes.MAIN,
        element: <Main />,
      },
      {
        path: Routes.BOOKING,
        element: <BookingBoard />,
      },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
];

export const router = createBrowserRouter(routes);

