import React from "react";
import { NavLink } from "react-router-dom";
import Tab from "../Tab/Tab";

const Header = () => {
  return (
    <div className="tabs">
      <Tab>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "is-active" : "")}
        >
          Home
        </NavLink>
      </Tab>
      <Tab>
        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? "is-active" : "")}
        >
          About
        </NavLink>
      </Tab>
      <Tab>
        <NavLink
          to="/features"
          className={({ isActive }) => (isActive ? "is-active" : "")}
        >
          Features
        </NavLink>
      </Tab>
    </div>
  );
};

export default Header;
