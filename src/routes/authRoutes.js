const express = require('express');
const debug = require('debug')('app:authRoutes');
const passport = require('passport');
const authRouter = express.Router();
const bodyParser = require('body-parser');
let User = require('../../models/users');

function router(nav) {
    authRouter.route('/signup')
    .get((req, res) => {
        res.render('signUp', {
            nav,
            title: 'Create New Account'
        })
    })
    .post((req,res) => {
       console.log(req.body); 
       const {username,password} = req.body;
        User.findOne({ username})
            .then(user => {
                if (user != null && user.username === username) {
                    return res
                        .status(400)
                        .json({ usererror: "user with this username and email already registered in our system" });
                } else {
                    const newUser = new User({
                        username:username,
                        password:password
                    });
                    newUser
                        .save()
                        .then(user => req.login(user.username, () => {
                            res.redirect('/auth/profile');
                        }))
                        .catch(error => console.log(error));

                }
            })
            .catch(error => console.log(error));    
    });

    authRouter.route('/signin')
        .get((req,res) => {
            res.render('signIn',{
                nav,
                title:'Sign In'
            })
        })
        .post(passport.authenticate('local', {
            successRedirect: '/auth/profile',
            failureRedirect: '/'
        }));

    authRouter.route('/profile')
    .all((req, res, next) => {
      if (req.user) {
        next();
      } else {
        res.redirect('/');
      }
    })
    .get((req, res) => {
        res.render('profile',{
            nav,
            title:"Profile",
            user:req.user

        })
    });

    authRouter.get('/logout',(req, res) => {
        req.logout();
        res.redirect('/');
    });


    return authRouter;
};
module.exports = router;