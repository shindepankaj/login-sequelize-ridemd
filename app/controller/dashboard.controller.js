
const db = require('../config/db.config.js');
const User = db.users;

// Fetch all users
exports.fetchAllUsers = (req, res) => {	

	// res.send('Token Verified - ' + req.headers['token'])

	// paginated users
	User.findAll({
		limit: 10, offset: (req.body.pageNumber-1) * 10
	}).then(users => {
		// Send all users to Client
		res.send(users);
	});


};

