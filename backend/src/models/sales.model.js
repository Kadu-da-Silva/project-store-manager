const camelize = require('camelize');
const connection = require('./connection');
const generateDate = require('../utils/generateDate');

const findAll = async () => {
  const [sales] = await connection.execute(
      `SELECT sale_id, product_id, date, quantity 
      FROM sales
      INNER JOIN sales_products ON sales_products.sale_id = sales.id;`,
    );
  return camelize(sales);
};

const findById = async (saleId) => {
  const [sale] = await connection.execute(
    `SELECT sale_id, product_id, date, quantity
    FROM sales
    INNER JOIN sales_products ON sales_products.sale_id = sales.id
    WHERE sales.id = ?`,
    [saleId],
  );
  return camelize(sale);
};

const insertSale = async () => {
  const date = generateDate();
  const [{ insertId }] = await connection.execute(
    'INSERT INTO sales (date) VALUES (?)',
    [date],
  );
  return insertId;
};

const insertSaleProduct = async (saleId, productId, quantity) => {
  await connection.execute(
    'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
    [saleId, productId, quantity],
  );
};

module.exports = {
  findAll,
  findById,
  insertSale,
  insertSaleProduct,
};