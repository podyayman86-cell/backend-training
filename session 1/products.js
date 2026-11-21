const products = [
  { name: "Keyboard", price: 450, inStock: true },
  { name: "Mouse", price: 150, inStock: false },
  { name: "Monitor", price: 3200, inStock: true },
];

// 1. Filter only inStock products
const InStockProducts = products.filter((product) => product.inStock);
// 2. Map to an array of product names
const InStockProductNames = InStockProducts.map((product) => product.name);

export default {
  products,
  InStockProducts,
  InStockProductNames
};
