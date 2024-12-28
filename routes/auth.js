const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const {validationRegisterUser,validationLoginUser,validationUpdateUser,User} = require('../models/User');
const bcrypt = require('bcryptjs')


/**
 *  @desc Register New User
 *  @route /api/auth/register
 *  @method POST
 * @access public
 */
router.post('/register',asyncHandler(
    async (req,res)=>{
    const {error} = await validationRegisterUser(req.body);
    if(error){
        return res.status(400).json({message: error.details[0].message});
    }
    // check if this user already have account
    let user = await User.findOne({email: req.body.email});
    if (user){
        res.status(400).json({message : 'this user already registerd '});
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password,salt);
    req.body.password = hashPassword;
    user = new User({
        email : req.body.email,
        username : req.body.username,
        password : req.body.password,
    })
     await user.save();
    const token  = user.generateToken() ;
    const {password , ...other}= user._doc;
    res.status(201).json({...other,token});

}));

/**
 *  @desc log in User
 *  @route /api/auth/login
 *  @method POST
 * @access public
 */
router.post('/login',asyncHandler(
    async (req,res)=>{
    const {error} = await validationLoginUser(req.body);
    if(error){
        return res.status(400).json({message: error.details[0].message});
    }
    // check if this user already have account
    let user = await User.findOne({email: req.body.email});
    if (!user){
        res.status(400).json({message : ' invalid email '});
    }
    const isPasswordMatch = await bcrypt.compare(req.body.password,user.password);
    if(!isPasswordMatch){
        res.status(400).json({message : ' invalid password '});
    }
   
    const token  = user.generateToken() ;
    const {password , ...other}= user._doc;
    res.status(200).json({...other,token});

}));



module.exports =    router;
