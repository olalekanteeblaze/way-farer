import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server/server';

chai.use(chaiHttp);

const user = {
  email: 'testuser@testuser.com',
  password: 'testuser',
  first_name: 'testuser',
  last_name: 'testuser',
};
const trip = {
  token: 'cisjicjwicwije',
  user_id: '45g64',
  is_admin: true,
};

describe('Users', () => {
  /*
  * Test the /POST route
  */
  describe('/POST ', () => {
    it('it should POST user signup info', (done) => {
      chai.request(server)
        .post('/auth/signup')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.should.be.an('object');
          res.body.length.should.be.eql(0);
          done();
        });
    });
    it('it should POST signin info', (done) => {
      chai.request(server)
        .post('/auth/signin')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.should.be.a('object');
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });
});

describe('Trips', () => {
  /*
    *Test the POST endpoints
    */
  describe('/ POST ', () => {
    it('it should POST trips', (done) => {
      chai.request(server)
        .post('/trips')
        .send(trip)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.should.be.a('object');
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });
  /*
    *Test the GET endpoints
    */
  describe('/ GET ', () => {
    it('it should GET trips', (done) => {
      chai.request(server)
        .get('/trips')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });
  describe(' /PATCH', () => {
    it('should delete a trip', (done) => {
      chai.request(server)
        .patch('/trips/:tripId')
        .end((err, res) => {
          res.should.have.a.status(200);
          res.body.data.should.be.a('object');
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });
});

describe('Bookings', () => {
  describe('/POST Bookings', () => {
    it('should POST bookings info', (done) => {
      chai.request(server)
        .post('/bookings')
        .send(user)
        .end((err, res) => {
          res.should.have.a.status(200);
          res.body.data.should.be.a('object');
          res.body.body.length.should.be.eql(0);
          done();
        });
    });
  });
  describe('/GET bookings', () => {
    it('should GET bookings info', (done) => {
      chai.request(server)
        .get('/bookings')
        .end((err, res) => {
          res.should.have.a.status(200);
          res.body.data.should.be.a('array');
          res.body.data.length.should.be.eql(0);
          done();
        });
    });
  });
  describe('/DELETE bookings', () => {
    it('should DELETE a booking', (done) => {
      chai.request(server)
        .delete('/bookings/:bookingId')
        .end((err, res) => {
          res.should.have.a.status(200);
          res.body.data.should.be.a('object');
          res.body.data.length.should.be.eql(0);
          done();
        });
    });
  });
});
