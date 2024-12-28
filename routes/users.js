const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const {validationUpdateUser,User} = require('../models/User');
const bcrypt = require('bcryptjs');
const {verifyTokenAndAuthorization, verifyTokenAndAdmin} = require('../middlewares/verifyToken');




/**
 *  @desc update User
 *  @route /api/users/:id
 *  @method PUT
 * @access private
 */

router.put("/:id",verifyTokenAndAuthorization,asyncHandler( async (req,res)=>{
    
    // const {}= await validationUpdateUser(req.body);
    // if(error){
    //     return res.status(400).json({message: error.details[0].message});
    // }
    console.log(req.headers)
    if(req.body.password){
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password,salt);
        req.body.password = hashPassword;
    };
    const updateUser = await User.findByIdAndUpdate(req.params.id,{
        $set:
        {
          email : req.body.email,
          username : req.body.username,
          password : req.body.password,
        }  
        },{new :true}).select("-password");
        res.status(200).json(updateUser);
    })
)


/**
 *  @desc get all Users
 *  @route /api/users
 *  @method GET
 * @access private (only admin)
 */

router.get("/",verifyTokenAndAdmin,asyncHandler( async (req,res)=>{
    const users =await User.find().select("-password");
    res.status(200).json(users);
}
));
/**
 *  @desc get user by id
 *  @route /api/users/:id
 *  @method GET
 * @access private (only admin && user himself)
 */

router.get("/:id",verifyTokenAndAuthorization,asyncHandler( async (req,res)=>{
    const user = await User.findById(req.params.id).select("-password");
    if(user){
        res.status(200).json(user);
    }else{
        res.status(404).send("user not found");
    }
}
));

/**
 *  @desc delete user
 *  @route /api/users/:id
 *  @method delete
 * @access private (only admin && user himself)
 */

router.delete("/:id",verifyTokenAndAuthorization,asyncHandler( async (req,res)=>{
    const user = await User.findById(req.params.id).select("-password");
    if(user){
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json(`this user deleted : ${user}`);
    }else{
        res.status(404).send("user not found");
    }
}
));


module.exports = router;