const camelize = require('camelize');
const connection = require('./connection');

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

module.exports = {
  findAll,
  findById,
};