const db = require('../config/db.config.js');
const User = db.users;

const bcrypt = require('bcrypt');

var jwt=require('jsonwebtoken');

module.exports.authenticate=function(req,res){
    
    var email=req.body.email;
    var password=req.body.password;

    // Find a Customer by Id
    // exports.findByEmail = (req, res) => {	
        User.findOne({ where: {email: req.body.email} }).then(user => {
            // res.send(customer);

            if(user){

                bcrypt.compare(password, user.password, function(err, result) {
                    
                    if(result) {
                        // Passwords match
                        var token=jwt.sign(user.toJSON(),process.env.SECRET_KEY,{
                            expiresIn:5000
                        });
                        res.json({
                            status:true,
                            token:token,
                            message:'successfully authenticated'
                        })
    
                    } else {
                        // Passwords don't match
                        res.json({
                            status:false,
                            message:"Email and password does not match"
                        });
                    } 
                });
             
            }
    
            else{
              res.json({
                  status:false,    
                message:"Email does not exits"
              });
            }

        })
    // };

}
