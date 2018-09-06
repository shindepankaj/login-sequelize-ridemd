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

    // Disable User
    app.post('/secure-api/enableUser', registerController.enableUser);

    // Send email
    app.post('/secure-api/sendMail', registerController.sendMail);

}