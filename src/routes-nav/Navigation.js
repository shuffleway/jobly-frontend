import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import "./Navigation.css"

import UserContext from "../auth/UserContext";


const Navigation = ({ logout }) => {
  const { currentUser } = useContext(UserContext);

  function loggedInNav() {
    return (
      <nav>
        <div className="nav-menu">
          <NavLink className="nav-link" to="/companies">Companies</NavLink>
          <NavLink className="nav-link" to="/jobs">Jobs</NavLink>
          <NavLink className="nav-link" to="/profile">Profile</NavLink>
        </div>
        <div className="nav-logout">
          <Link className="nav-link" to="/" onClick={logout}>
            Log out {currentUser.first_name || currentUser.username}
          </Link>
        </div>
      </nav>
    );
  }

  function loggedOutNav() {
    return (
      <nav>
        <div>
          <NavLink className="nav-link" to="/login">Login</NavLink>
          <NavLink className="nav-link" to="/signup">Sign Up</NavLink>
        </div>
      </nav>
    );
  }

  return (
    <nav>
      <div>
        <Link className="navbar-brand" to="/">Jobly</Link>
      </div>
      {currentUser ? loggedInNav() : loggedOutNav()} 
    </nav>
  );
}

export default Navigation;
