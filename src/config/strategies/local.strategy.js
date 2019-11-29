const passport = require('passport');
const { Strategy } = require('passport-local'); 
const debug = require('debug')('app:local.Strategy');
let User = require('../../../models/users');

module.exports = function localStrategy() {
    passport.use(new Strategy((
        {
            usernameField: 'username',
            passwordField: 'password'
        },(username,password,done) => {
            User.findOne({ username })
                .then(user => {
                    if(user.password === password){
                        done(null,user)
                    }
                    else{
                        done(null,false)
                    }
                })
                .catch(error => console.log(error));  
        }
    )));
};
 