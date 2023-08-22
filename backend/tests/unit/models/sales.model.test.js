const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { salesModel } = require('../../../src/models');
const { saleId, allSales, saleIds } = require('../mocks/sales.mock');

describe('Realizando testes - SALES MODEL:', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Recuperando sales', async function () {
    sinon.stub(connection, 'execute').resolves([allSales]);
    
    const sales = await salesModel.findAll();

    expect(sales).to.be.an('array');
    expect(sales).to.be.deep.equal(allSales);
  });

  describe('Recuperando product por id e verificando elementos', function () {
    it('deve retornar um array com dois objetos', async function () {
      sinon.stub(connection, 'execute').resolves([saleIds]);

      const sale = await salesModel.findById(1);
      expect(sale).to.be.an('array');
      expect(sale).to.be.deep.equal(saleIds);
    });

    it('deve retornar um array com um objeto', async function () {
      sinon.stub(connection, 'execute').resolves([saleId]);
      
      const sale = await salesModel.findById(2);
      expect(sale).to.be.an('array');
      expect(sale).to.be.deep.equal(saleId);
    });

    it('id incorreto, deve retornar undefined ', async function () {
      sinon.stub(connection, 'execute').resolves([undefined]);
      
      const sale = await salesModel.findById(999);
      expect(sale).to.be.equal(undefined);
    });
  });

  it('Inserindo sale', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);

    const newSale = await salesModel.insertSale();

    expect(newSale).to.be.an('number');
    expect(newSale).to.be.deep.equal(1);
  });
});