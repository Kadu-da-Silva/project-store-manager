const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { productService } = require('../../../src/services');
const { productsModel } = require('../../../src/models');
const { allProducts, productId, newProduct, updateProduct } = require('../mocks/products.mock');

const success = 'SUCCESSFUL';
const createSuccess = 'CREATED';
const deleteSuccess = 'DELETE';

describe('Realizando testes - PRODUCT SERVICE', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Recuperando products', async function () {
    sinon.stub(connection, 'execute').resolves([allProducts]);
    sinon.stub(productsModel, 'findAll').resolves(allProducts);
    
    const { status, data } = await productService.getAll();

    expect(status).to.be.equal(success);
    expect(data).to.be.an('array');
    expect(data).to.be.deep.equal(allProducts);
  });

  it('Recuperando product por id', async function () {
    sinon.stub(connection, 'execute').resolves([[productId]]);
    sinon.stub(productsModel, 'findById').resolves(productId);
    
    const { status, data } = await productService.getById(1);

    expect(status).to.be.equal(success);
    expect(data).to.be.an('object');
    expect(data).to.be.deep.equal(productId);
  });

  it('Inserindo produto', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);
    sinon.stub(productsModel, 'insert').resolves(newProduct);

    const productName = 'Teste';
    const { status, data } = await productService.createProduct(productName);

    expect(status).to.be.equal(createSuccess);
    expect(data).to.be.an('object');
    expect(data).to.be.deep.equal(newProduct);
  });
  
  it('Atualizando produto', async function () {
    sinon.stub(connection, 'execute').resolves();
    sinon.stub(productsModel, 'update').resolves(updateProduct);

    const { status, data } = await productService.updateProduct(1, 'Teste');

    expect(status).to.be.equal(success);
    expect(data).to.be.an('object');
    expect(data).to.be.deep.equal(updateProduct);
  });

  it('Deletando produto', async function () {
    sinon.stub(connection, 'execute').resolves();
    sinon.stub(productsModel, 'deleteProduct').resolves();

    const { status } = await productService.deleteProduct(1);

    expect(status).to.be.equal(deleteSuccess);
  });
});