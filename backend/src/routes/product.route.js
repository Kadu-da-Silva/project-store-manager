const route = require('express').Router();
const { productController } = require('../controllers');

route.get('/', productController.getAll);
route.get('/:id', productController.getById);
route.post('/', productController.createProduct);
route.put('/:id', productController.updateProduct);
route.delete('/:id', productController.deleteProduct);

module.exports = route;