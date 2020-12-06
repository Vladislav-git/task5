const {v4 : uuidv4} = require('uuid');

const fs = require('fs');


class UsersService {

	usersList = JSON.parse(fs.readFileSync('./users_db.json').toString());

	getUsers = () => {
		return this.usersList;
	};

	getUserById = (id) => {
		const userById = this.usersList.find(element => id === element.id);
		return userById ? userById : 'user not found';
	};

	addUser = (body) => {
		const isNameTaken = this.usersList.find((element,i) => body.name === this.usersList[i].name);
		if (isNameTaken === undefined) {
			body.id = uuidv4();
			this.usersList.push(body);
			return 'user created';
		} else {
			return 'this name is already in use';
		};
	};

	changeUser = (body, id) => {
		const userById = this.usersList.find(element => id === element.id);
		if (userById === undefined) {
			return 'user not found';
		} else {
			userById.name = body.name;
			this.usersList.map(element => {
				if (id === element.id) {
					return element = userById;
				} else {
					return element;
				};
			});
			return userById ? this.usersList : 'user not found';
		};
	};

	deleteUser = (id) => {
		const userById = this.usersList.find(element => id === element.id);
		if (userById === undefined) {
			return 'user not found';
		} else {
			const index = this.usersList.indexOf(userById, 0);
			this.usersList.splice(index, 1);
			return this.usersList;
		};
	};
};


module.exports = new UsersService();