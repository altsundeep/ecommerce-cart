import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../Store/store";
import { FaShoppingCart } from "react-icons/fa";

const Header = () => {
  const context = useContext(GlobalContext);
  const { state } = context;
  return (
    <div className="container">
      <nav className="d-flex justify-content-between align-items-center m-4 px-5">
        <div className="app--header-links">
          <li className="list-group-flush list-unstyled">
            <Link className="font-weight-bold " to="/store">
              <h5 style={{ fontFamily: "Helvetica Neue", fontSize: "25px" }}>
                {" "}
                <b>M</b>agicStore
              </h5>
            </Link>
          </li>
        </div>
        <div className="app--header-cart">
          <Link to="/cart">
            {" "}
            <FaShoppingCart style={{ fontSize: "25px" }} />{" "}
            <span>{state.length}</span>
          </Link>
        </div>
      </nav>
      <hr />
    </div>
  );
};

export default Header;
