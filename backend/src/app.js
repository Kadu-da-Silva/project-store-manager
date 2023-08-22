const express = require('express');
const { productsModel, salesModel } = require('./models');
const { validateSale } = require('./middlewares/validateSale');

const app = express();
app.use(express.json());

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

app.post('/products', async (req, res) => {
  const { name } = req.body;

  if (!name) return res.status(400).json({ message: '"name" is required' });
  if (name.length < 5) {
    return res.status(422).json({ 
      message: '"name" length must be at least 5 characters long',
    });
  }

  const productId = await productsModel.insert(name);

  return res.status(201).json(productId);
});

app.get('/sales', async (_req, res) => {
  const sales = await salesModel.findAll();
  return res.status(200).json(sales);
});

app.get('/sales/:id', async (req, res) => {
  const { id } = req.params;
  const sale = await salesModel.findById(id);
  
  if (!sale || sale.length === 0) {
    return res.status(404).json({ message: 'Sale not found' });
  }
  
  const saleWithoutId = sale.map((saleItem) => {
    const { saleId, ...saleDataWithoutId } = saleItem;
    return saleDataWithoutId;
  });

  return res.status(200).json(saleWithoutId);
});

app.post('/sales', validateSale, async (req, res) => {
  const saleItems = req.body;

  const saleId = await salesModel.insertSale();

  const insertedItems = await Promise.all(
    saleItems.map(async (item) => {
      const { productId, quantity } = item;
      await salesModel.insertSaleProduct(saleId, productId, quantity);
      return {
        productId,
        quantity,
      };
    }),
  );

  const saleResponse = {
    id: saleId,
    itemsSold: insertedItems,
  };

  return res.status(201).json(saleResponse);
});

module.exports = app;