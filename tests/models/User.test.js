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
          email: email
        }).save().then(()=>{}, (error)=>{
            expect(error.message).to.eql(`User validation failed: email: expected ${email} to be a valid email`);
            index == invalidEmails.length -1 && done();
          });
      });

    })
  })
});
