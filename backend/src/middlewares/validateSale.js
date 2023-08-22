const { productsModel } = require('../models');

class ValidationError extends Error {
  constructor(status, message) {
    super(message);
    this.name = 'ValidationError';
    this.status = status;
  }
}

const validateItem = async (item) => {
  const { productId, quantity } = item;

  if (!productId) {
    throw new ValidationError(400, '"productId" is required');
  }

  if (quantity === undefined) {
    throw new ValidationError(400, '"quantity" is required');
  }

  if (quantity <= 0) {
    throw new ValidationError(422, '"quantity" must be greater than or equal to 1');
  }

  const product = await productsModel.findById(productId);
  if (!product) {
    throw new ValidationError(404, 'Product not found');
  }
};

const validateSale = async (req, res, next) => {
  const saleItems = req.body;

  try {
    await Promise.all(saleItems.map((item) => validateItem(item)));
    next();
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

module.exports = {
  validateSale,
};
