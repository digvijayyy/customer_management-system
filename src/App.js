import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Customers from "./components/Customers";
import OrdersPage from "./components/OrdersPage";
import Products from "./components/Products.js";

function App() {
    const [order, setOrder] = useState([]);
    const [name, setName] = useState("");
    const [customerId, setCustomerId] = useState("");
    return (
        // Setting up Routes
        <Router>
            <div className="view container-fluid">
                <Switch>
                    <Route exact path="/" component={Customers} />
                    <Route exact path="/orders/:id">
                        <OrdersPage
                            setOrder={setOrder}
                            setName={setName}
                            setCustomerId={setCustomerId}
                        />
                    </Route>
                    <Route exact path="/products/:id">
                        <Products
                            data={order}
                            customerName={name}
                            customerId={customerId}
                        />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
