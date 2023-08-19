const express = require('express');
const { productsModel } = require('./models');

const app = express();

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_req, res) => {
  res.json({ status: 'Store Manager UP!' });
});

app.get('/products', async (_req, res) => {
  const products = await productsModel.findAll();
  return res.status(200).json(products);
});

app.get('/products/:productId', async (req, res) => {
  const { productId } = req.params;
  const product = await productsModel.findById(productId);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  return res.status(200).json(product);
});

module.exports = app;