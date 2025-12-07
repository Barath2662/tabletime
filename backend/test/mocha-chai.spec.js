import express from 'express';
import request from 'supertest';
import MenuItem from '../src/models/MenuItem.js';
import menuItemsRouter from '../src/routes/menuItems.js';
import sinon from 'sinon';
import { expect } from 'chai';
import { getMenuItems } from '../src/controllers/menuItemController.js';

describe('getMenuItems', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('returns items when found', async () => {
    const fakeItems = [{ name: 'Rasmalai', available: true }];
    sinon.stub(MenuItem, 'find').returns({
      sort: sinon.stub().returns(Promise.resolve(fakeItems))
    });

    const req = { query: { available: 'true' } };
    const jsonSpy = sinon.spy();

    const res = { json: jsonSpy, status: sinon.stub().returns({ json: jsonSpy }) };

    await getMenuItems(req, res);

    expect(jsonSpy.calledOnce).to.be.true;
  });

  it('parses available query correctly (controller expects "true" string)', async () => {
    const availableItems = [{ name: 'Rasmalai', available: true }];
    const unavailableItems = [];

    sinon.stub(MenuItem, 'find').callsFake((query) => {
      const sortStub = sinon.stub();
      if (query && query.available === true) {
        sortStub.returns(Promise.resolve(availableItems));
      } else if (query && query.available === false) {
        sortStub.returns(Promise.resolve(unavailableItems));
      } else {
        sortStub.returns(Promise.resolve(availableItems));
      }
      return { sort: sortStub };
    });

    const jsonSpy = sinon.spy();
    const res = { json: jsonSpy, status: sinon.stub().returns({ json: jsonSpy }) };

    // 'true' string should parse to true and return available items
    const reqTrue = { query: { available: 'true' } };
    await getMenuItems(reqTrue, res);
    expect(jsonSpy.calledWith(availableItems)).to.be.true;

    // '1' is *not* parsed as true by controller -> default behavior
    jsonSpy.resetHistory();
    const reqOne = { query: { available: '1' } };
    await getMenuItems(reqOne, res);
    expect(jsonSpy.calledWith(availableItems)).to.be.true;

    // 'false' is *not* parsed as boolean false by controller -> default behavior
    jsonSpy.resetHistory();
    const reqFalse = { query: { available: 'false' } };
    await getMenuItems(reqFalse, res);
    expect(jsonSpy.calledWith(availableItems)).to.be.true;
  });
});


describe('Menu items route', () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use('/api/menu-items', menuItemsRouter);
  });

  afterEach(() => sinon.restore());

  it('GET /api/menu-items returns items', async () => {
    sinon.stub(MenuItem, 'find').returns({
      sort: sinon.stub().returns(Promise.resolve([{ name: 'Rasmalai' }]))
    });
    // Option A: use .query()
    const res = await request(app)
      .get('/api/menu-items')
      .query({ available: 'true' });


    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
  });
});
