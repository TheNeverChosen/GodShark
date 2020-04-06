const services = require('./services');
const jwt = require('jsonwebtoken');
const errBuilder = require('../../utils/errBuilder');
const encoding = require('../../utils/encoding');

module.exports={
  async create(req, resp){
    const { logger, password }=req.body;
    let user;
    try{
      user = await services.getUserByLogger(logger);
    } catch(err){
      const error=errBuilder.database(err, 500);
      return resp.status(error.status).json(error);
    }
    
    if(user){
      let validate;
      try{
        validate = await services.verifyPassword(user.password, password);
      } catch(err){
        const error = errorBuilder('Internal server error', 'Error while hashing', 500);
        return resp.status(error.status).json(error);
      }

      if(validate){
        const secret = encoding.jwtSecret();
        const access_token=jwt.sign({email:user.email, username: user.username}, secret, {expiresIn: '1d'});
        return resp.cookie('access_token', access_token, {httpOnly:true}).json({successful:true});
      }
      else return resp.status(404).json({successful:false});
    }
    else return resp.status(404).json({successful:false});
  },

  async verify(req, resp){
    const { access_token } = req.cookies;

    if(access_token){
      const secret = encoding.jwtSecret();

      try{
        const payload = jwt.verify(access_token, secret);
        return resp.status(200).json({verified:true, payload});
      } catch(err){
        
        return resp.status(200).json({verified:false});
      }
    }
    else return resp.status(200).json({verified: false});
  }
}