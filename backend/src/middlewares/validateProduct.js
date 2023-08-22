const { productsModel } = require('../models');

const validateProductId = async (req, res, next) => {
  const { productId } = req.params;
  const product = await productsModel.findById(productId);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  next();
};

const validateProductName = async (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: '"name" is required' });
  }
  if (name.length < 5) {
    return res.status(422).json({ 
      message: '"name" length must be at least 5 characters long',
    });
  }
  next();
};

module.exports = {
  validateProductId,
  validateProductName,
};
