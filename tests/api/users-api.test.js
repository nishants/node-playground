const
  {expect} = require('chai'),
  User  = require('../../app/models/User'),
  request = require("supertest"),
  app = require('../../app/app');

describe('Users', ()=> {
  beforeEach((done)=> {
    User.remove({}).then(()=> done());
  });

  it('should create a user with valid email and password', (done)=> {
    const
      email = 'user@email.com',
      password = '123456';

    request(app)
      .post('/users')
      .send({email, password})
      .expect(200)
      .end((error, response)=> {
        expect(error).to.be.null;
        expect(response.body.user).to.include({email, password});
        done();
      });
  });

  it('should return 400 if user email is invalid', (done)=> {
    const
      email = '@email.com',
      password = '123456';

    request(app)
      .post('/users')
      .send({email, password})
      .expect(400)
      .end((error, response)=> {
        expect(error).to.be.null;
        expect(response.body.error).not.be.null;
        done();
      });
  });

  it('should return 400 if user password is invalid', (done)=> {
    const
      email = 'user@email.com',
      password = '12345';

    request(app)
      .post('/users')
      .send({email, password})
      .expect(400)
      .end((error, response)=> {
        expect(error).to.be.null;
        expect(response.body.error).not.be.null;
        done();
      });
  });


});