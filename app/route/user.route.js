module.exports = function(app) {
 
    const registerController = require('../controller/register.controller.js');
    const authenticationController = require('../controller/authenticate-controller.js');
    const dashboard = require('../controller/dashboard.controller.js');
 
    // Register User
    app.post('/api/register', registerController.create);

    // Authenticate User
    app.post('/api/authenticate', authenticationController.authenticate);
 
    // Fetch all users
    app.post('/secure-api/fetchAllUsers', dashboard.fetchAllUsers);
 
    // Disable User
    app.post('/secure-api/disableUser', registerController.disableUser);

    // // Retrieve all Customer
    // app.get('/api/customers', customers.findAll);
 
    // // Retrieve a single Customer by Id
    // app.get('/api/customers/:customerId', customers.findById);
 
    // // Update a Customer with Id
    // app.put('/api/customers/:customerId', customers.update);
 
    // // Delete a Customer with Id
    // app.delete('/api/customers/:customerId', customers.delete);
}