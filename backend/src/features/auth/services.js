const db = require('../../database/models');
const validating = require('../../utils/validating');
const encoding =  require('../../utils/encoding');

module.exports={

  getUserByLogger(logger){
    let query;
    const logType=validating.logType(logger);
    if(logType==="email") query={ email: logger };
    else query={ username: logger };
    
    return db.User.findOne({
      where:query
    });
  },

  verifyPassword(password, literal){
    return encoding.verifyHash(password, literal);
  }

}