import React, { useState, useEffect } from "react";
import OrdersNav from "./OrdersNav";
import { Link } from "react-router-dom";
import axios from "axios";
import { withRouter } from "react-router";

function OrdersPage(props) {
    const customerId = props.match.params.id;
    const [customerName, setCustomerName] = useState("");
    const [data, setData] = useState([]);
    useEffect(() => {
        props.setCustomerId(customerId);
        // fetching orders for all the customers
        axios
            .get("http://localhost:5000/orders")
            .then(({ data }) => {
                for (const customer in data) {
                    if (data[customer].id === customerId) {
                        setCustomerName(customer);
                        setData(data[customer].data);
                        break;
                    }
                }
            })
            .catch((err) => console.log(err));
    }, []);
    useEffect(() => {
        props.setName(customerName);
    }, [customerName]);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        // grouping the orders based on their orderId
        let groupedOrders = {};
        data.forEach((item, index) => {
            if (item.orderId in groupedOrders === false)
                groupedOrders[item.orderId] = [];
            groupedOrders[item.orderId].push(item);
        });
        let tempArray = [];
        for (const order in groupedOrders) {
            tempArray.push(groupedOrders[order]);
        }
        setOrders(tempArray);
    }, [data]);

    const orderRow =
        orders !== undefined ? (
            orders.map((order, index) => {
                return (
                    <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{order[0].orderId}</td>
                        <td>{order[0].orderDate.slice(0, 10)}</td>
                        <td>{order[0].orderDate.slice(11, -5)}</td>
                        <td>
                            <Link
                                to={`/products/${order[0].orderId}`}
                                type="button"
                                className="btn btn-outline-dark"
                                onClick={() => props.setOrder(order)}
                                style={{ fontWeight: "500" }}
                            >
                                <i className="fas fa-info-circle"></i> Details
                            </Link>
                        </td>
                    </tr>
                );
            })
        ) : (
            <tr></tr>
        );

    return (
        <div>
            <OrdersNav name={customerName} />
            <div className="container dashboard card mt-5">
                <Link
                    to="/"
                    className="btn btn-link"
                    style={{
                        textDecoration: "none",
                        textAlign: "left",
                        fontWeight: "500",
                        color:"darkred"
                    }}
                >
                    <i className="fas fa-arrow-left"></i> Back to Customer
                    Panel...
                </Link>
                <div className="card-body clients">
                    <div className="row">
                        <div className="col-7" style={{ fontWeight: "bold" }}>
                            <i className="fas fa-users"></i> {customerName}
                            {"  "}
                            Orders
                        </div>
                    </div>
                    <div class="table-responsive-lg">
                    <table className="table table-hover table-striped table-borderless">
                        <thead>
                            <tr>
                                <th className="col">S. No.</th>
                                <th className="col">Order ID</th>
                                <th className="col">Order Date</th>
                                <th className="col">Order Time</th>
                            </tr>
                        </thead>
                        <tbody>{orderRow}</tbody>
                    </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withRouter(OrdersPage);
