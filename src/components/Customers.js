import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import Loading from "../components/Loading";
import axios from "axios";

function Customers() {
    const [customers, setCustomers] = useState([]);
    useEffect(() => {
        // Getting customer data
        axios
            .get("http://localhost:5000")
            .then(({ data }) => {
                setCustomers(data);
            })
            .catch((err) => console.log(err));
    }, []);
    // Calculate the total number of Orders
    const totalNumberOfOrders = customers.reduce(
        (total, curr) => total + curr.numberOfOrders,
        0
    );
    const panelRows =
        customers !== undefined ? (
            customers.map((customer, index) => (
                <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{customer.name}</td>
                    <td>{customer.email}</td>
                    <td>{customer.phone}</td>
                    <td>
                        <Link
                            to={`/orders/${customer.id}`}
                            type="button"
                            className="btn btn-outline-dark"
                            style={{ fontWeight: "500"
                             }}
                        >
                            <i className="fas fa-info-circle"></i> View Orders
                        </Link>
                    </td>
                </tr>
            ))
        ) : (
            <tr></tr>
        );
    if (!customers) {
        return <Loading />;
    }
    return (
        <div>
            <NavBar />
            <div className="container dashboard card mt-5">
                <div className="card-body clients">
                    <div className="row" style={{ fontWeight: "bold" }}>
                        <div className="col-7 font-weight-bold">
                            <i className="fas fa-users"></i> Customers
                        </div>
                        <div className="col">
                            <p style={{ fontWeight: "bold" }}>
                                Total Orders:{" "}
                                <span className="order-count">
                                    {totalNumberOfOrders}
                                </span>
                            </p>
                        </div>
                    </div>
                    <div class="table-responsive-lg">
                    <table className="table table-hover table-striped table-borderless">
                        <thead>
                            <tr>
                                <th className="col">S.No</th>
                                <th className="col">Name</th>
                                <th className="col">Email</th>
                                <th className="col">Phone</th>
                            </tr>
                        </thead>
                        <tbody>{panelRows}</tbody>
                    </table>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Customers;
