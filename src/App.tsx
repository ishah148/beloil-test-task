import { FC, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { PrimeReactProvider } from "primereact/api";

import "primeicons/primeicons.css";
import "../src/assets/styles/main.scss";
import "primereact/resources/themes/lara-light-indigo/theme.css";

import Footer from "./components/ui/footer/Footer.tsx";
import Header from "./components/ui/header/Header.tsx";
import { Routes } from "./router";
import { Provider } from "react-redux";
import { store } from "./store";
import Notification from "./components/notification/Notification.tsx";

const App: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      navigate(Routes.MAIN);
    }
  }, []);

  return (
    <div className={"layout-wrapper"}>
      <Provider store={store} >
        <PrimeReactProvider>
          <Notification />
          <Header />
          <Outlet />
          <Footer />
        </PrimeReactProvider>
      </Provider>
    </div>
  );
};

export default App;
