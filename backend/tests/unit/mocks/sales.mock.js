const date = '2023-08-19T01:42:26.000Z';

const allSales = [

  {
    saleId: 1,
    productId: 1,
    date,
    quantity: 5,
  },
  {
    saleId: 1,
    productId: 2,
    date,
    quantity: 10,
  },
  {
    saleId: 2,
    productId: 3,
    date,
    quantity: 15,
  },
];

const saleIds = [
  {
    productId: 1,
    date,
    quantity: 5,
  },
  {
    productId: 2,
    date,
    quantity: 10,
  },
];

const saleId = [
  {
    productId: 3,
    date,
    quantity: 15,
  },
];

module.exports = {
  allSales,
  saleIds,
  saleId,
};