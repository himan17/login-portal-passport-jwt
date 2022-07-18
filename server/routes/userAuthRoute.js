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
/**
 * @swagger
 * components:
 *   schemas:
 *     Register:
 *       type: object
 *       required:
 *         - fullName
 *         - email
 *         - password
 *       properties:
 *         fullName:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *       example:
 *         fullName: Alex
 *         email: alex@google.com
 *         password: "23451425"
 *     Login:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *         password:
 *           type: string
 *       example:
 *         email: alex@google.com
 *         password: "23451425"
 */
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

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register New user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Register'
 *     responses:
 *       200:
 *         description: User Registered to the sever
 *       300:
 *         description: Entries not valid, Password should be 8 characters long
 *       500:
 *         description: Some internal error
 */

router.post('/register', (req, res) =>{
    console.log(req.body);
    const {errors, isValid} = regValidator(req.body);
    if(!isValid){
        res.status(300).json({success: false, error: errors});
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
            res.status(200).json({
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
        .catch(er =>{res.status(500).json({success: false, error: er})});
    }
})

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Authenticate user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: Authorized user
 *       300:
 *         description: Entries not valid, Password should be 8 characters long
 *       500:
 *         description: Not registered
 */

router.post('/login', (req, res) => {
    const{errors, isValid} = logValidator(req.body);
    if(!isValid){
        res.status(300).json({success: false, error: errors});
    }
    else{
        const curUser = Users.findOne({email: req.body.email})
        .then((user)=>{
            if (!bcrypt.compareSync(req.body.password, user.password)) {
                res.status(300).json({ message: "Invalid password", success: false });
            }
            else{
                let token = "Bearer "+createToken(user._id);
                res.status(200).json({success: true, user, token: token});
            }
            
        }).catch(er => {
                res.status(500).json({success: false, message: "You are not registered"});
        })
    }
});
/**
* @swagger
* /profile: 
*   get: 
*     parameters: 
*       - 
*         in: header
*         name: Authorization
*         schema: 
*           required: true
*           type: string
*     responses: 
*       200: 
*         description: "User fetched"
*       401: 
*         description: "Unauthorized token"
*     summary: "Fetch user by its Bearer token"
*/
router.get('/profile', passport.authenticate('jwt', {session: false}),(req, res)=>{
    res.status(200).json(req.user);
})

module.exports = router;