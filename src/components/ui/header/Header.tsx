import { FC } from "react";
import { NavLink } from "react-router-dom";
import { Routes } from "../../../router";
import "../../../assets/styles/main.scss";

const Header: FC = () => {
  return (
    <header className={"layout-topbar"}>
      <div className=""></div>
      <div className="layout-topbar__link-container">
        <ul>
          <li>
            <NavLink to={Routes.MAIN}>Бронирование авиабилетов</NavLink>
          </li>
          <li>
            <NavLink to={Routes.BOOKING}>Бронирование рейсов</NavLink>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
