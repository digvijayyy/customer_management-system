const fs = require("fs");
const express = require("express");
const { default: Axios } = require("axios");
const router = new express.Router();

const dataPath = "./data/data.json";

// setting up get requests
router.get("/", (req, res) => {
    fs.readFile(dataPath, "utf8", (err, data) => {
        if (err) {
            throw err;
        }
        const parsedData = JSON.parse(data);
        const customers = [];
        // sending a response containing customers with the total number of products ordered
        for (const customer in parsedData) {
            let currCustomer = {
                name: customer,
                id: parsedData[customer].id,
                email: parsedData[customer].email,
                phone: parsedData[customer].phone,
                numberOfOrders: parsedData[customer].data.length,
            };
            customers.push(currCustomer);
        }
        res.status(200).send(customers);
    });
});

router.get(`/orders/`, (req, res) => {
    fs.readFile(dataPath, "utf8", (err, data) => {
        if (err) {
            throw err;
        }
        res.status(200).send(JSON.parse(data));
    });
});

router.get("/products/", (req, res) => {
    fs.readFile(dataPath, "utf8", (err, data) => {
        if (err) {
            throw err;
        }
        const parsedData = JSON.parse(data);
        res.status(200).send({ data: parsedData.customer1.data });
    });
});

router.get("/products/:customerId", (req, res) => {
    fs.readFile(dataPath, "utf8", (err, data) => {
        if (err) {
            throw err;
        }
        const parsedData = JSON.parse(data);
        for (const customer in parsedData) {
            if (parsedData[customer].id === req.params.customerId) {
                res.status(200).send({ data: parsedData[customer].data });
            }
        }
        res.status(404).send("No such customer found for this ID");
    });
});

// setting up post request for updating the product details
router.post("/products/:id", (req, res) => {
    fs.readFile(dataPath, "utf8", (err, data) => {
        if (err) {
            throw err;
        }
        const parsedData = JSON.parse(data);
        const receivedData = req.body;
        // modifying the parsedData based on the post request
        for (const customer in parsedData) {
            if (parsedData[customer].id === req.params.id) {
                let modifiedData = parsedData[customer].data;
                modifiedData = modifiedData.filter(
                    (product) => product.orderId !== receivedData.orderId
                );
                modifiedData = [...modifiedData, ...receivedData.order];
                parsedData[customer].data = modifiedData;
                break;
            }
        }
        // modifying data.json
        fs.writeFile(
            dataPath,
            JSON.stringify(parsedData, null, 2),
            "utf8",
            (err) => {
                if (err) throw err;
                res.status(200).send("The file has been modified successfully");
            }
        );
    });
});

module.exports = router;
