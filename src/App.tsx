import { FC, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { PrimeReactProvider } from "primereact/api";

import "primeicons/primeicons.css";
import "../src/assets/styles/main.scss";
import "primereact/resources/themes/lara-light-indigo/theme.css";

import Footer from "./components/footer/Footer.tsx";
import Header from "./components/header/Header.tsx";
import { Routes } from "./router";
import { Provider } from "react-redux";
import { store } from "./store";

const App: FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(Routes.MAIN);
  }, []);

  return (
    <div className={"layout-wrapper"}>
      <Provider store={store}>
        <PrimeReactProvider>
          <Header />
          <Outlet />
          <Footer />
        </PrimeReactProvider>
      </Provider>
      ,
    </div>
  );
};

export default App;
