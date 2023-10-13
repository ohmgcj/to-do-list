const express = require('express');
const controller = require('../controllers/crud.controller');

const router = express.Router();

const routes = [
  router.get('/', controller.SearchList),
  router.post('/', controller.CreateList),
  router.put('/:id', controller.UpdateList),
  router.patch('/:id/:status', controller.UpdateStatus),
  router.delete('/:id', controller.DeleteList),
];

module.exports = routes;
