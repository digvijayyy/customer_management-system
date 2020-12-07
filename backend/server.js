const express = require("express");
const bodyParser = require("body-parser");
const router = require("./router/router");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

// setting up middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(router); // getting the router data from router.js

app.listen(port, () => console.log("Server is up on http://localhost:" + port));

// data/data.json is used as database and modified using nodeJS file system functionality (fs)
// API endpoints
// http://localhost:5000 -> customers page
// http://localhost:5000/orders -> GET request -> gets all the orders for all the customers
// http://localhost:5000/products -> GET request -> gets all the products
// http://localhost:5000/products/:id -> POST request -> modifies the order data based on id of customer
