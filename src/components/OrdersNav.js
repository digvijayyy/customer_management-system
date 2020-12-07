import React from "react";
import { Link } from "react-router-dom";

// NavBar for Orders and Products Page
function OrdersNav(props) {
    return (
        <div className="container-fluid">
            <nav
                className="navbar navbar-expand-md navbar-dark"
                style={{ color: "black" }}
            >
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand h1">
                        Your Orders
                    </Link>
                    <div
                        className="collapse navbar-collapse"
                        id="navbarSupportedContent"
                    >
                        <ul className="nav navbar-nav navbar-right ml-auto">
                            <span
                                className="nav-link"
                                style={{ color: "rgba(255, 255, 255, 0.7)" }}
                            >
                                <i className="fas fa-user"></i> {props.name}
                            </span>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default OrdersNav;
