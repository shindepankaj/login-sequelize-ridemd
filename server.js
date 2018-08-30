var express = require('express');
var router=express.Router();
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json())
 
var jwt= require("jsonwebtoken");

const db = require('./app/config/db.config.js');

const User = db.users;
const Role = db.roles;

// constants
var constants = require('./app/lib/constants.js');

process.env.SECRET_KEY="thisismysecretkey";

// // force: true will drop the table if it already exists
db.sequelize.sync({force: false, alter: true}).then(() => {
  console.log('Drop and Resync with { force: false }');
});
 
require('./app/route/user.route.js')(app);

app.use('/secure-api',router);

// validation middleware
router.use(function(req,res,next){
    var token=req.body.token || req.headers['token'];
    if(token){
        jwt.verify(token,process.env.SECRET_KEY,function(err,ress){
            if(err){
                res.status(500).send('Token Invalid');
            }else{
                next();
            }
        })
    }else{
        res.send('Please send a token')
    }
})

// router.post('/home',function(req,res){
//     res.send('Token Verified - ' + req.headers['token'])
// })

var mainFunction = function () {
    const init = () => {
        initRoles();
        functionTwo();
    }

    function initRoles() {
        console.log("Bootstraping roles...");
        constants.ROLES.forEach(element => {
            Role.findOne({ where: { authority: element } }).then(role => {
                if(!role) {
                    Role.create({  
                        authority: element
                    }).then(role => {		
                        console.log("Role added...");
                    });
                }
            });
        });
    }

    function functionTwo() {
        console.log("functionTwo executed....");
    }

    return {
        init: init
    }

}();

mainFunction.init();

// Create a Server
var server = app.listen(8082, function () {
  console.log("App listening at http://%s:%s", 'localhost', 8082)
})
