const db = require('../../database/models');

module.exports={
  async create(user){
    return db.User.create(user);
  },

  index(){
    return db.User.findAll();
  }
}