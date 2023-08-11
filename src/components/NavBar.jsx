import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <ul className="nav">
      <li className="nav-item">
        <Link className="nav-link active" aria-current="page" to="/">
          Posts
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/create-post">
          Add Post
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/dashboard">
          Dashboard
        </Link>
      </li>
    </ul>
  );
}

export default NavBar;
