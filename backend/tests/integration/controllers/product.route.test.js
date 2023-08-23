const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chaiHttp = require('chai-http');

const { expect } = chai;
chai.use(sinonChai);
chai.use(chaiHttp);

const app = require('../../../src/app');
const connection = require('../../../src/models/connection');
const { allProducts, productId, newProduct } = require('../mocks/product.mock');

describe('Realizando testes(integração) - PRODUCT ROUTE', function () {
  afterEach(function () {
    sinon.restore();
  });

  describe('Testando rota GET', function () {
    it('Recuperando products', async function () {
      sinon.stub(connection, 'execute').resolves([allProducts]);
      
      const { body, statusCode } = await chai.request(app).get('/products');
  
      expect(statusCode).to.be.equal(200);
      expect(body).to.be.an('array');
      expect(body).to.be.deep.equal(allProducts);
    });
  
    it('Recuperando product por id', async function () {
      sinon.stub(connection, 'execute').resolves([[productId]]);
      
      const { body, statusCode } = await chai.request(app).get('/products/1');
  
      expect(statusCode).to.be.equal(200);
      expect(body).to.be.an('object');
      expect(body).to.be.deep.equal(productId);
    });
  
    it('Recuperando product por id com erro', async function () {
      sinon.stub(connection, 'execute').resolves([[undefined]]);
      
      const { body, statusCode } = await chai.request(app).get('/products/999');
  
      expect(statusCode).to.be.equal(404);
      expect(body).to.be.an('object');
      expect(body).to.be.deep.equal({ message: 'Product not found' });
    });
  });

  describe('Testando rota POST', function () {
    it('Inserindo produto', async function () {
      sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);
  
      const { body, statusCode } = await chai.request(app)
        .post('/products')
        .send({ name: 'Teste' });
  
      expect(statusCode).to.be.equal(201);
      expect(body).to.be.an('object');
      expect(body).to.be.deep.equal(newProduct);
    });

    it('Inserindo produto sem name', async function () {
      sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);
  
      const { body, statusCode } = await chai.request(app)
        .post('/products')
        .send({ name: '' });
  
      expect(statusCode).to.be.equal(400);
      expect(body).to.be.an('object');
      expect(body).to.be.deep.equal({ message: '"name" is required' });
    });

    it('Inserindo produto com name inválido', async function () {
      sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);
  
      const { body, statusCode } = await chai.request(app)
        .post('/products')
        .send({ name: 'Test' });
  
      expect(statusCode).to.be.equal(422);
      expect(body).to.be.an('object');
      expect(body).to.be.deep.equal({
        message: '"name" length must be at least 5 characters long',
      });
    });
  });
});