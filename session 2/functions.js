import { promisify } from "util";
import fs from "fs/promises";
const sleep = promisify(setTimeout);

const orderStatus = [];
async function validateorder(order) {
  await sleep(500);
    if (order <= 0) {
        orderStatus.push({ order: order, status: "invalid" });
        console.log(`Order ${order} is invalid`);
        throw new Error("Invalid order");
    }
  else {
        orderStatus.push({ order: order, status: "valid" });
        return console.log(`Order ${order} is valid`);
    }
}

async function preparefood(order) {
    await sleep(1500);
    orderStatus[orderStatus.findIndex(o => o.order === order)].status = "cooked";
    return console.log(`Food for order ${order} is ready`);
}

async function packorder(order) {
    await sleep(700);
    orderStatus[orderStatus.findIndex(o => o.order === order)].status = "completed";
    return console.log(`Order ${order} is completed`);
    
}

async function processinglesorder(order) {
    try {
        const validate = await validateorder(order);
        const cooking = await preparefood(order);
        const packing = await packorder(order);
        const result = await fs.appendFile('./session 2/order_log.txt', `Order ${order} is ready\n`);
    } catch (error) {
        await fs.appendFile('./session 2/order_log.txt', `Order ${order} failed: ${error.message}\n`);
    }
    finally {
        console.log(`Order ${order} proccessing completed`);
    }
}

async function processBatch(orders) { 
    console.time('total');
    const processing = await Promise.allSettled(orders.map(order => processinglesorder(order)));
    console.timeEnd('total');
    console.log("Batch processing completed");
}
processBatch([1, 2, -3, 4, 5]);
export default { orderStatus, processBatch };