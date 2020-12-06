const usersService = require('../service/user.service.js');


class UsersController {
	service = usersService

	get = (req, res, next) => {
		res
			.status(200)
			.send(this.service.getUsers())
	};

	getById = (req, res, next) => {
		res
			.status(200)
			.send(this.service.getUserById(req.params.id))
	};

	add = (req, res, next) => {
		res
			.status(201)
			.send(this.service.addUser(req.body))
	};

	change = (req, res, next) => {
		res
			.status(200)
			.send(this.service.changeUser(req.body, req.params.id))
	};
	
	delete = (req, res, next) => {
		res
			.status(200)
			.send(this.service.deleteUser(req.params.id))
	}
}


module.exports = new UsersController();