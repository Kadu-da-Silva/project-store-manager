const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chaiHttp = require('chai-http');

const { expect, assert } = chai;
chai.use(sinonChai);
chai.use(chaiHttp);

const app = require('../../../src/app');
const connection = require('../../../src/models/connection');
const { allSales, saleId } = require('../mocks/sale.mock');
const { salesModel, productsModel } = require('../../../src/models');

describe('Realizando testes(integração) - SALES ROUTE', function () {
  describe('Testando rota GET', function () {
    it('Recuperando sales', async function () {
      sinon.stub(connection, 'execute').resolves([allSales]);

      const { body, statusCode } = await chai.request(app).get('/sales');

      expect(statusCode).to.be.equal(200);
      expect(body).to.be.an('array');
      expect(body).to.be.deep.equal(allSales);
    });

    it('Recuperando sale por id', async function () {
      sinon.stub(connection, 'execute').resolves([saleId]);

      const { body, statusCode } = await chai.request(app).get('/sales/3');

      expect(statusCode).to.be.equal(200);
      expect(body).to.be.an('array');
      expect(body).to.be.deep.equal(saleId);
    });

    it('Recuperando sale por id com erro', async function () {
      sinon.stub(salesModel, 'findById').resolves([]);

      const response = await chai.request(app).get('/sales/999');

      expect(response).to.have.status(404);
      expect(response.body).to.deep.equal({ message: 'Sale not found' });
    });
  });

  // TODO ERROR expect
  // Expected an assignment or function call and instead saw an expression.eslintno-unused-expressions
  // (property) Chai.Assertion.calledTwice: Chai.Assertion
  // true if the spy was called exactly twice.

  // O linter está reclamando porque a função expect está retornando um valor que não está sendo usado. Para resolver isso, você pode usar o método assert do Chai para verificar as chamadas das funções. 

  describe('Testando rota POST', function () {
    it('Deve criar uma nova venda', async function () {
      const saleItems = [
        { productId: 1, quantity: 5 },
        { productId: 2, quantity: 3 },
      ];
      const insertedSaleId = 123;
  
      // Stub do modelo de vendas para simular a inserção de uma venda
      const insertSaleStub = sinon.stub(salesModel, 'insertSale').resolves(insertedSaleId);
  
      // Stub do modelo de vendas para simular a inserção dos itens da venda
      const insertSaleProductStub = sinon.stub(salesModel, 'insertSaleProduct').resolves();
  
      // Stub do modelo de produtos para simular a busca de produtos
      const findByIdStub = sinon.stub(productsModel, 'findById').resolves({});
  
      const response = await chai
        .request(app)
        .post('/sales')
        .send(saleItems);
  
        assert.strictEqual(response.status, 201);
        assert.isObject(response.body);
        // Verifique se a resposta contém o ID da venda e os itens vendidos
        assert.propertyVal(response.body, 'id', insertedSaleId);
        assert.property(response.body, 'itemsSold');
        assert.isArray(response.body.itemsSold);
        assert.lengthOf(response.body.itemsSold, saleItems.length);
    
        // Verifique se os stubs foram chamados corretamente
        sinon.assert.calledOnce(insertSaleStub);
        sinon.assert.calledTwice(insertSaleProductStub); // Uma vez para cada item da venda
        sinon.assert.calledTwice(findByIdStub); // Uma vez para cada item da venda
    });

    it('Deve retornar erro de validação para venda inválida', async function () {
      const invalidSaleItems = [
        { productId: 1, quantity: -5 }, // Quantidade inválida
        { productId: 2 }, // Sem quantidade
        { quantity: 3 }, // Sem productId
      ];
  
      const response = await chai
        .request(app)
        .post('/sales')
        .send(invalidSaleItems);
  
      assert.strictEqual(response.status, 422);
      assert.deepEqual(response.body, { message: '"quantity" must be greater than or equal to 1' });
    });  
  });

  afterEach(function () {
    sinon.restore();
  });
});