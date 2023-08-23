const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { productService } = require('../../../src/services');
const { productController } = require('../../../src/controllers');
const { allProducts, productId, newProduct, updateProduct } = require('../mocks/products.mock');

const success = 'SUCCESSFUL';
const createSuccess = 'CREATED';

describe('Realizando testes - PRODUCT CONTROLLER', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Recuperando products', async function () {
    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returns(allProducts),
    };
    sinon.stub(productService, 'getAll').resolves({ status: success, data: allProducts });
    
    const result = await productController.getAll(req, res);

    expect(res.status).to.be.calledWith(200);
    expect(result).to.be.deep.equal(allProducts);
  });

  it('Recuperando product por id', async function () {
    const req = {
      params: { id: 1 },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returns(productId),
    };
    sinon.stub(productService, 'getById').resolves({ status: success, data: productId });
    
    const result = await productController.getById(req, res);

    expect(res.status).to.be.calledWith(200);
    expect(result).to.be.deep.equal(productId);
  });

  it('Inserindo produto', async function () {
    const req = {
      body: newProduct,
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returns(newProduct),
    };
    sinon.stub(productService, 'createProduct').resolves({ status: createSuccess, data: newProduct });

    const result = await productController.createProduct(req, res);

    expect(res.status).to.be.calledWith(201);
    expect(result).to.be.deep.equal(newProduct);
  });
  
  it('Atualizando produto', async function () {
    const req = {
      params: { id: 1 },
      body: updateProduct,
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returns(updateProduct),
    };
    sinon.stub(productService, 'updateProduct').resolves({ status: success, data: updateProduct });

    const result = await productController.updateProduct(req, res);

    expect(res.status).to.be.calledWith(200);
    expect(result).to.be.deep.equal(updateProduct);
  });
});