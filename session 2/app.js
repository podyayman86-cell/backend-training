import express from "express";
const app = express();
app.use(express.json());
import functions from "./functions.js";


app.post("/createorder", (req, res) => {
    const order = req.body.order;
    if (order === undefined || order === null) {
        return res.status(400).send("Order is required");
    }
    if (functions.orderStatus.find(o => o.order === order)) {
        return res.status(400).send("Order already exists");
    }
    functions.processBatch([order]);
    res.send("Order created");
 })
app.get("/checkorder/:orderId", (req, res) => {
    const { orderId } = req.params;
    const order = functions.orderStatus.find(o => o.order === parseInt(orderId));
    if (!order) {
        return res.status(400).send("Order not found");
    }
    
    res.json(order);
})

export default app;