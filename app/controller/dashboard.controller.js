
const db = require('../config/db.config.js');
const User = db.users;

// Fetch all users
exports.fetchAllUsers = (req, res) => {	

	// res.send('Token Verified - ' + req.headers['token'])

	User.findAll().then(users => {
		// Send all users to Client
		res.send(users);
	});


};

