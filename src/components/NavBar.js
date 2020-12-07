import React from "react";
import { Link } from "react-router-dom";

// NavBar for Headings Page
function NavBar() {
    return (
        <div className="container-fluid">
            <nav
                className="navbar navbar-expand-md navbar-dark"
                style={{ color: "black" }}
            >
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand h1">
                        Customer Panel
                    </Link>
                </div>
            </nav>
        </div>
    );
}

export default NavBar;
