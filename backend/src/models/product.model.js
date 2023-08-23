const camelize = require('camelize');
const connection = require('./connection');

const findAll = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM products',
  );
  return camelize(products);
};

const findById = async (id) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [id],
  );
  return camelize(product);
};

const insert = async (name) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO products (name) VALUES (?)',
    [name],
  );
  return { id: insertId, name };
};

const update = async (id, name) => {
  await connection.execute(
    'UPDATE products SET name = ? WHERE id = ?',
    [name, id],
  );
  return { id: Number(id), name };
};

const deleteProduct = async (productId) => {
  await connection.execute('DELETE FROM products WHERE id = ?', [productId]);
};

module.exports = {
  findAll,
  findById,
  insert,
  update,
  deleteProduct,
};