const express = require('express');
const routes = express.Router();
const controllers = require('./controllers');

routes.post('/user', controllers.create);

routes.get('/user', controllers.index);

module.exports = routes;