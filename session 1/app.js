import express from 'express';
import data from './products.js';

const app = express();
app.use(express.json());
// 3. Write a function to compute total price of inStock items
const ComputeTotalPrice =(InStockProducts) => {
  return InStockProducts.reduce((total, product) => total + product.price, 0);
};

app.get('/Home', (req, res) => {
  
  res.status(200).send('Welcome to the Home Page');
});
app.get('/Home/products', (req, res) => {
  res.status(200).send(data.products);
});
app.get('/Home/products/inStock', (req, res) => {
  const totalPrice = ComputeTotalPrice(data.InStockProducts);
  res.status(200).json({
    inStockProducts: data.InStockProductNames,
    totalPrice: totalPrice
  });
});
export default app;