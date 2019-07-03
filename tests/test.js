//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();


chai.use(chaiHttp);
//Our parent block
describe('Users', () => {
    beforeEach((done) => { //Before each test we empty the database
        User.remove({}, (err) => { 
           done();           
        });        
    });
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
                  res.body.data.should.be.a('object');
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
    beforeEach((done) => {
        Trip.remove({}, (err) => {
            done();
        });
    });
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

})


