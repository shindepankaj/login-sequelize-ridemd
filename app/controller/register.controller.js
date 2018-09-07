const db = require('../config/db.init.js');
const User = db.users;

var nodeMailer = require('nodemailer');

const bcrypt = require('bcrypt');

// Add User
exports.create = (req, res) => {	

	console.log("----", req.body);

	User.findOne({ where: { email: req.body.email } }).then(user => {
		if(user) {
			res.status(200).send('User already exists.');
		} else {
			bcrypt.hash(req.body.password, 10, function(error, hash) {
				// Store hash in database
				// Save to MySQL database
				User.create({  
					name: req.body.name,
					email: req.body.email,
					password: hash
				}).then(user => {		
					// Send created customer to client
						if (error) {
								res.json({
										status:false,
										message:'there are some error with query'
								})
						}else{
								res.json({
										status:true,
										data:user,
										message:'user registered sucessfully'
								})
						}
		
				});
		
			});
		}
	});

};

// Disable User
exports.disableUser = (req, res) => {
	User.findOne({ where: { email: req.body.email } }).then(user => {
		if(user) {
			user.enabled = false;
			user.save().then(() => {
				console.log('--1-- ', user.enabled);
			});
			res.status(200).send('User disabled successfully.');
		} else {
			res.status(200).send('User not found.');
		}
	});
};

// Enable User
exports.enableUser = (req, res) => {
	User.findOne({ where: { email: req.body.email } }).then(user => {
		if(user) {
			user.enabled = true;
			user.save().then(() => {
				console.log('--1-- ', user.enabled);
			});
			res.status(200).send('User enabled successfully.');
		} else {
			res.status(200).send('User not found.');
		}
	});
};

// send email
exports.sendMail = (req, res) => {
	/*
	Email credentials - pankaj.k.shinde@gmail.com
	Server Name: email-smtp.us-west-2.amazonaws.com
	Port: 25, 465 or 587 - Use 587
	SMTP Username: AKIAJVMDHWFAMI4ZLXKQ
	SMTP Password: Aju/swuJy1QJ4g7jG0RtzV0yAVbm1NoatAyajHX/pCzt
	*/
	let transporter = nodeMailer.createTransport({
		/*
		host: 'smtp.gmail.com',
		port: 465,
		secure: true,
		auth: {
			user: 'hehaha.2010@gmail.com',
			pass: 'password'
		}
        */
		host: 'email-smtp.us-west-2.amazonaws.com',
		port: 465,
		secure: true,
		auth: {
			user: 'AKIAJVMDHWFAMI4ZLXKQ',
			pass: 'Aju/swuJy1QJ4g7jG0RtzV0yAVbm1NoatAyajHX/pCzt'
        }
	});
	let mailOptions = {
		from: '"Pankaj Shinde" <pankaj.k.shinde@gmail.com>', // sender address
		to: 'shindepankaj1977@gmail.com', // list of receivers
		subject: 'req.body.subject', // Subject line
		// text: 'req.body.body' // plain text body
		html: '<b>NodeJS Email Tutorial</b>' // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
            res.status(200).send('Email sending failed.');
		} else {
			console.log('Message %s sent: %s', info.messageId, info.response);
            res.status(200).send('Email sent successfully.');
        }
    });
};


// // FETCH all Customers
// exports.findAll = (req, res) => {
// 	Customer.findAll().then(customers => {
// 	  // Send all customers to Client
// 	  res.send(customers);
// 	});
// };
 
// // Find a Customer by Id
// exports.findById = (req, res) => {	
// 	Customer.findById(req.params.customerId).then(customer => {
// 		res.send(customer);
// 	})
// };
 
// // Update a Customer
// exports.update = (req, res) => {
// 	const id = req.params.customerId;
// 	Customer.update( { firstname: req.body.firstname, lastname: req.body.lastname, age: req.body.age }, 
// 					 { where: {id: req.params.customerId} }
// 				   ).then(() => {
// 					 res.status(200).send("updated successfully a customer with id = " + id);
// 				   });
// };
 
// // Delete a Customer by Id
// exports.delete = (req, res) => {
// 	const id = req.params.customerId;
// 	Customer.destroy({
// 	  where: { id: id }
// 	}).then(() => {
// 	  res.status(200).send('deleted successfully a customer with id = ' + id);
// 	});
// };