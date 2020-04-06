const express = require('express');
const routes = express.Router();

const controllers = require('./controllers');

routes.post('/auth', controllers.create);
routes.get('/auth', controllers.verify);

module.exports = routes;