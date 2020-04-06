const argon = require('argon2'); //must have node-gyp
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

module.exports={

  //error status code: 500;
  async hashUserPass(user){
    const { password }=user;
    user.password = await argon.hash(password);
  },

  verifyHash(hash, literal){
    return argon.verify(hash, literal); //returns Promise
  },

  jwtSecret(){ //returns jwt Secret to its signature. if doesn't exist, create and store one.
    const filePath = path.join(__dirname, '..', 'config', 'jwt.json');
    if(fs.existsSync(filePath)){
      const { secret } = JSON.parse(fs.readFileSync(filePath));
      return secret;
    }
    else{
      const secret = crypto.randomBytes(256).toString('hex');
      const data = JSON.stringify({ secret });
      fs.writeFileSync(filePath, data);
      return secret;
    }
  }

}