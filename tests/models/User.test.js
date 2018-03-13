const
  User = require('../../app/models/User'),
  {expect} = require('chai');

describe("User", ()=>{
  describe("Email", ()=> {
    it("should validate email string", (done)=> {
      const invalidEmails = [
        'ab',
        'ab@',
        'a.com',
        'a.b.com',
        '@b.com'
      ];
      invalidEmails.forEach((email, index)=> {
        new User({
          email: email,
          password: '1234556'
        }).save().then(()=>{}, (error)=>{
            expect(error.message).to.eql(`User validation failed: email: expected ${email} to be a valid email`);
            index == invalidEmails.length -1 && done();
          });
      });

    })
  });

  describe("Auth Token", ()=> {
    it("should generate auth token", (done)=> {
      let user;
      new User({email: 'email@users.com', password: '1234567'}).save().then(saved => {
        user = saved;
        user.generateAuthToken().then((token)=> {
          User.findOne({email: 'email@users.com'}).then(user=> {
            const savedAuthToken = user.tokens.find(token => token.access == 'auth');
            expect(savedAuthToken.token).to.equal(token);
            done();
          });
        });
      });

    })
  })

});
