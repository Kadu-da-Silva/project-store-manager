const route = require('express').Router();
const { productController } = require('../controllers');
const { validateProductName, validateProductId } = require('../middlewares/validateProduct');

route.get('/', productController.getAll);
route.get('/:id', validateProductId, productController.getById);
route.post('/', validateProductName, productController.createProduct);
route.put('/:id', validateProductId, validateProductName, productController.updateProduct);
route.delete('/:id', validateProductId, productController.deleteProduct);

module.exports = route;