import { FC } from "react";
import { Outlet } from "react-router-dom";
import { PrimeReactProvider } from "primereact/api";

import 'primeicons/primeicons.css';
import "../src/assets/styles/main.scss";
import "primereact/resources/themes/lara-light-indigo/theme.css";

import Footer from "./components/footer/Footer.tsx";
import Header from "./components/header/Header.tsx";

const App: FC = () => {
  return (
    <div className={"layout-wrapper"}>
      <PrimeReactProvider>
        <Header />
        <Outlet />
        <Footer />
      </PrimeReactProvider>
    </div>
  );
};

export default App;
