import "./styles.css";

import { NavLink, Outlet, useLocation } from "react-router-dom";
import CardIcon from "../CardIcon";
import { useEffect } from "react";

export default function Navbar() {
 
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      <nav className="nav">
        <h1 className="nav-title">Lanchonete v1</h1>
        <ul className="nav-main">
          <NavLink
            to={"/"}
            className={({ isActive }) => (isActive ? "active" : "inactive")}
          >
            <li>Home</li>
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) => (isActive ? "active" : "inactive")}
          >
            <CardIcon />
          </NavLink>
          <NavLink
            to={"/admin"}
            className={({ isActive }) => (isActive ? "active" : "inactive")}
          >
            <li>Admin</li>
          </NavLink>
        </ul>
      </nav>
      <div className="content">
        <Outlet />
      </div>
    </>
  );
}
