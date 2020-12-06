const controller = require('../controller/users.controller.js');

const express = require('express');
const router = express.Router();

router
	.get('/users/:id', controller.getById)
	.get('/users', controller.get)
	.post('/users', controller.add)
	.put('/users/:id', controller.change)
	.delete('/users/:id', controller.delete)

module.exports = router;