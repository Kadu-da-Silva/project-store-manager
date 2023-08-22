const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { productsModel } = require('../../../src/models');
const { productId, allProducts, newProduct } = require('../mocks/products.mock');

describe('Realizando testes - PRODUCTS MODEL:', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Recuperando products', async function () {
    sinon.stub(connection, 'execute').resolves([allProducts]);
    
    const products = await productsModel.findAll();

    expect(products).to.be.an('array');
    expect(products).to.be.deep.equal(allProducts);
  });

  it('Recuperando product por id', async function () {
    sinon.stub(connection, 'execute')
      .onFirstCall()
      .resolves([[productId]])
      .onSecondCall()
      .resolves([[undefined]]);
    
    const productFirstCall = await productsModel.findById(1);
    expect(productFirstCall).to.be.an('object');
    expect(productFirstCall).to.be.deep.equal(productId);

    const productSecondCall = await productsModel.findById(999); 
    expect(productSecondCall).to.be.equal(undefined);
  });

  it('Inserindo produto', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);

    const productName = 'Teste';
    const product = await productsModel.insert(productName);

    expect(product).to.be.an('object');
    expect(product).to.be.deep.equal(newProduct);
  });
  
  it('Atualizando produto', async function () {
    sinon.stub(connection, 'execute').resolves();

    const productUpdate = await productsModel.update(1, 'Teste');
    expect(productUpdate).to.be.an('object');
    expect(productUpdate).to.be.deep.equal({ id: 1, name: 'Teste' });
  });

  it('Deletando produto', async function () {
    sinon.stub(connection, 'execute').resolves();

    const deleteProduct = await productsModel.deleteProduct(1);

    expect(deleteProduct).to.be.an('undefined');
  });
});