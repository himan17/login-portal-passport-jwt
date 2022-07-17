const express = require('express');
const Users = require('../models/users');
const bcrypt = require('bcrypt');
const regValidator = require('../validators/regValidator');
const logValidator = require('../validators/logValidator');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
require('../middleware/passportJwtAuth');
require('dotenv').config();

function createToken(id){
    return jwt.sign(
        { id },
        process.env.SECRET_KEY,
        {
            expiresIn: 3*24*60*60,
            algorithm: 'HS256'
        }
    );
}

router.post('/register', (req, res) =>{
    console.log(req.body);
    const {errors, isValid} = regValidator(req.body);
    if(!isValid){
        res.json({success: false, error: errors});
    }
    else{
        
        const newUser = new Users({
            fullName: req.body.fullName,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10)
        });
        newUser
        .save()
        .then((user) => {
            let token = "Bearer "+createToken(user._id);
            res.json({
                success: true, 
                user, 
                token: token
            });
            console.log({
                success: true, 
                user, 
                token: token
            });
        })
        .catch(er =>{res.json({success: false, error: er})});
    }
})

router.post('/login', (req, res) => {
    const{errors, isValid} = logValidator(req.body);
    if(!isValid){
        res.json({success: false, error: errors});
    }
    else{
        const curUser = Users.findOne({email: req.body.email})
        .then((user)=>{
            if (!bcrypt.compareSync(req.body.password, user.password)) {
                res.json({ message: "Invalid password", success: false });
            }
            else{
                let token = "Bearer "+createToken(user._id);
                res.json({success: true, user, token: token});
            }
            
        }).catch(er => {
                res.json({success: false, message: "You are not registered"});
        })
    }
});

router.get('/profile', passport.authenticate('jwt', {session: false}),(req, res)=>{
    res.json(req.user);
})

module.exports = router;