
const db = require('../config/db.init.js');
const User = db.users;

// Fetch all users
exports.fetchAllUsers = (req, res) => {	

	// res.send('Token Verified - ' + req.headers['token'])

	// paginated users
	User.findAll({
		limit: 10, offset: (req.body.pageNumber-1) * 10, raw: true
	}).then(users => {
		// for readable representation of users array
		console.log(JSON.stringify(users, null, 2));
		// Send all users to Client
		res.send(users);
	});

};

