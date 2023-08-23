const { productsModel } = require('../models');

const getAll = async () => {
  const allProducts = await productsModel.findAll();
  return { status: 'SUCCESSFUL', data: allProducts };
};

const getById = async (id) => {
  const product = await productsModel.findById(id);
  return { status: 'SUCCESSFUL', data: product };
};

const createProduct = async (name) => {
  const newProduct = await productsModel.insert(name);
  return { status: 'CREATE_SUCCESSFUL', data: newProduct };
};

const updateProduct = async (id, name) => {
  const updateProductData = await productsModel.update(id, name);
  return { status: 'SUCCESSFUL', data: updateProductData };
};

const deleteProduct = async (id) => {
  await productsModel.deleteProduct(id);
  return { status: 'DELETE_SUCCESSFUL' };
};

module.exports = {
  getAll,
  getById,
  createProduct,
  updateProduct,
  deleteProduct,
};