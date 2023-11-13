import { RouteObject, createBrowserRouter } from "react-router-dom";
import NotFound from "../pages/NotFound.tsx";
import App from "../App.tsx";
import FlightsBoard from "../pages/flightsBoard/FlightsBoard.tsx";
import BookingBoard from "../pages/BookingBoard.tsx";

export enum Routes {
  MAIN = "/flights-board",
  BOOKING = "/booking",
}

const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: Routes.MAIN,
        element: <FlightsBoard />,
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
