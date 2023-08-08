const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server.js');
const Concert = require('../../../models/concert.model.js');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe ('GET /api/concerts', () => {

  before(async () => {
    const concertOne = new Concert({ performer: 'John Doe', genre: 'Rock', price: 25, day: 1, image: '/img/uploads/1fsd324fsdg.jpg' });
    await concertOne.save();

    const concertTwo = new Concert({ performer: 'Rebekah Parker', genre: 'R&B', price: 25, day: 3, image: '/img/uploads/2f342s4fsdg.jpg' });
    await concertTwo.save();

    const concertThree = new Concert({ performer: 'Maybell Haley', genre: 'Pop', price: 40, day: 3, image: '/img/uploads/hdfh42sd213.jpg' });
    await concertThree.save();

    const concertFour = new Concert({ performer: 'Stephen Parkinson', genre: 'Rock', price: 35, day: 1, image: '/img/uploads/1fsd324fsdg.jpg' });
    await concertFour.save();

    const concertFive = new Concert({ performer: 'Johnny Oakley', genre: 'Rock', price: 40, day: 2, image: '/img/uploads/2f342s4fsdg.jpg' });
    await concertFive.save();

    const concertSix = new Concert({ performer: 'Sarah Smith', genre: 'Pop', price: 50, day: 3, image: '/img/uploads/hdfh42sd213.jpg' });
    await concertSix.save();
  });

  
  it('/performer/:performer should return two concerts by :performer', async () => {

    const res = await request(server).get('/api/concerts/performer/john');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(2);

  });

  it('/performer/:performer should return one concert by :performer', async () => {

    const res = await request(server).get('/api/concerts/performer/parker');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(1);

  });


  it('/genre/:genre should return three concerts by :genre', async () => {

    const res = await request(server).get('/api/concerts/genre/rock');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(3);
    
  });

  it('/genre/:genre should return two concerts by :genre', async () => {

    const res = await request(server).get('/api/concerts/genre/pop');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(2);
    
  });


  it('/price/:price_min/:price_max should return five concerts by :price_min/:price_max', async () => {

    const res = await request(server).get('/api/concerts/price/25/40');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(5);
    
  });

  it('/price/:price_min/:price_max should return three concerts by :price_min/:price_max', async () => {

    const res = await request(server).get('/api/concerts/price/40/60');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(3);
    
  });


  it('/day/:day should return three concerts by :day', async () => {

    const res = await request(server).get('/api/concerts/day/3');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(3);
    
  });

  it('/day/:day should return two concerts by :day', async () => {

    const res = await request(server).get('/api/concerts/day/1');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(2);
    
  });


  after(async () => {
    await Concert.deleteMany();
  });
});