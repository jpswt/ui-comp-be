const getUsers = 'select * from users';

const getUserById = 'select * from users where id = $1';

module.exports = {
	getUsers,
	getUserById,
};
