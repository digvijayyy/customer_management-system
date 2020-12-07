import React, { useState, useEffect } from "react";
import OrdersNav from "./OrdersNav";
import { withRouter } from "react-router";
import Loading from "../components/Loading"
import { Link } from "react-router-dom";
import axios from "axios";

function Products(props) {
    const [order, setOrder] = useState([]);
    const { data, customerName, customerId } = props;
    useEffect(() => {
        setOrder(data);
    }, [data]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const submitData = { orderId: order[0].orderId, order };
        axios
            .post(`http://localhost:5000/products/${customerId}`, submitData)
            .then((res) => {
                console.log("post request done", res);
                props.history.push(`/orders/${customerId}`);
            })
            .catch((err) => console.log(err));
    };

    const productRow =
        order !== undefined ? (
            order.map((product, index) => {
                return (
                    <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{product.name}</td>
                        <td>{product.product_id}</td>
                        <td>
                            <input
                                type="number"
                                value={product.quantity}
                                onChange={(e) => {
                                    setOrder((prevOrder) => {
                                        let curr = product;
                                        curr.quantity = e.target.value;
                                        return [
                                            ...prevOrder.slice(0, index),
                                            curr,
                                            ...prevOrder.slice(index + 1),
                                        ];
                                    });
                                }}
                                style={{ width: "100px" }}
                            />
                        </td>
                        <td>
                            <div className="custom-control custom-switch">
                                <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    checked={product.status}
                                    onChange={(e) => {
                                        setOrder((prevOrder) => {
                                            let curr = product;
                                            curr.status = !curr.status;
                                            return [
                                                ...prevOrder.slice(0, index),
                                                curr,
                                                ...prevOrder.slice(index + 1),
                                            ];
                                        });
                                    }}
                                />{" "}
                                <label
                                    className="custom-control-label" for="customCheck"
                                    htmlFor="customSwitch1"
                                >
                                    Mark As Done
                                </label>
                            </div>
                        </td>
                    </tr>
                );
            })
        ) : (
            <tr></tr>
        );
    if (!order || order.length === 0) {
        return <Loading />; // while data is being fetched
    }
    return (
        <div>
            <OrdersNav name={customerName} />
            <div className="container dashboard card mt-5">
                <Link
                    to={`/orders/${customerId}`}
                    className="btn btn-link"
                    style={{
                        textDecoration: "none",
                        textAlign: "left",
                        fontWeight: "500",
                        color:"darkred"
                    }}
                >
                    <i className="fas fa-arrow-left"></i> Back to Your Orders...
                </Link>
                <form className="card-body clients" onSubmit={handleSubmit}>
                    <div className="row">
                        <span className="col-7" style={{ fontWeight: "bold" }}>
                            <i className="fas fa-users"></i> Ordered Products
                        </span>
                        <div className="col text-align-right">
                            <p style={{ fontWeight: "bold" }}>
                                Order ID:{" "}
                                <span className="order-count">
                                    {order[0].orderId}
                                </span>
                            </p>
                        </div>
                        <div className="col text-align-right">
                            <p style={{ fontWeight: "bold" }}>
                                Order Date:{" "}
                                <span className="order-count">
                                    {order[0].orderDate.slice(0, 10)}
                                </span>
                            </p>
                        </div>
                    </div>
                    <div class="table-responsive-lg">
                    <table className="table table-hover table-striped table-borderless">
                        <thead >
                            <tr>
                                <th className="col">S. No.</th>
                                <th className="col">Name</th>
                                <th className="col">Product Id</th>
                                <th className="col">Quantity</th>
                                <th className="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>{productRow}</tbody>
                    </table>
                    </div>
                    <button
                        type="submit"
                        className="btn btn-outline-success btn-block float-right"
                        style={{ marginRight: "4em", fontWeight: "1000" }}
                        value="Submit"
                    >
                        Save Order
                    </button>
                </form>
            </div>
        </div>
    );
}

export default withRouter(Products);
