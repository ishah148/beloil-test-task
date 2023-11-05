import { FC } from "react";
import { Link } from "react-router-dom";
import { Routes } from "../router";

const NotFound: FC = () => {
  return (
    <>
      <div>Not found</div>
      <Link to={Routes.MAIN}>Back to home page</Link>
    </>
  );
};

export default NotFound;
