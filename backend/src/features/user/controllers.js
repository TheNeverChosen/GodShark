const services = require('./services');
const errorBuilder = require('../../utils/errBuilder');
const encoding = require('../../utils/encoding');
const validating = require('../../utils/validating');

module.exports = {
  async create(req, resp) {
    let user = req.body; //geting user from requisition body

    if (!validating.userVal(user)) { //validating user
      const error = errorBuilder.normal('Invalid user', 'Invalid user data. Verify again', 400);
      return resp.status(error.status).json(error);
    }

    try { //hashing
      await encoding.hashUserPass(user);
    } catch (err) {
      const error = errorBuilder('Internal server error', 'Error while hashing', 500);
      return resp.status(error.status).json(error);
    }

    try {
      const result = await services.create(user);
      resp.status(201).json(result);
    } catch (err) {
      const error=errorBuilder.database(err, 409);
      return resp.status(error.status).json(error);
    }
  },

  async index(req, resp) {
    try {
      const result = await services.index();
      resp.status(200).json(result);
    } catch (err) {
      const error = errorHandler.dbFormat(err, 500);
      resp.status(error.status).json(err);
    }
  }
}