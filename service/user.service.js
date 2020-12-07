const {v4 : uuidv4} = require('uuid');

const fs = require('fs');
const fileWrite = (data) => {
	fs.writeFileSync('./users_db.json', data);
};

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
			fileWrite(JSON.stringify(this.usersList));
			return this.usersList;
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
			fileWrite(JSON.stringify(this.usersList));
			return this.usersList;
		};
	};

	deleteUser = (id) => {
		const userById = this.usersList.find(element => id === element.id);
		if (userById === undefined) {
			return 'user not found';
		} else {
			const index = this.usersList.indexOf(userById, 0);
			this.usersList.splice(index, 1);
			fileWrite(JSON.stringify(this.usersList));
			return this.usersList;
		};
	};
};


module.exports = new UsersService();