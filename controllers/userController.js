const asyncHandler=require("express-async-handler");
const User=require("../models/userModels");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const dotenv=require("dotenv").config();


//@desc registration a user
//@route post/api/foods/register
//@access public

const registerUser=asyncHandler(async(req,res)=>{
    const{username,email,password,address,phone}=req.body;
    //to check field is empty
    if(!username || !email ||! password || !address ||!phone){
        res.status(400);
        throw new Error("All fields are required!");
    }

    //to check user already exist
    const userAvailable=await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("user already exist!");

    }

    //hashed password
    const hashedPassword =await bcrypt.hash(password,10);
    console.log("Hashed Password:",hashedPassword);

    //create new users
    const user=await User.create({
        username,
        email,
        password:hashedPassword,
        address,
        phone,
    });

    console.log(`user created ${user}`);

    //send information to the user
    if(user){
        res.status(201).json({_id:user.id,email:user.email,address:user.address,phone:user.phone});

    }else{
        res.status(400);
        throw new Error("user data is not valid")
    }
});

//@desc login user
//@route post/api/foods/login
//access public

const loginUser=asyncHandler(async(req,res)=>{
    const{email,password}=req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All field are required");
    }

    const user=await User.findOne({email});
    if(user && (await bcrypt.compare(password,user.password))){
        const accessToken=jwt.sign({
            user:{
                username:user.username,
                email:user.email,
                id:user.id,
            },
        },
        process.env.ACCESS_TOKEN_SECRET,

        {expiresIn:"15"}
    )
    res.status(200).json({accessToken});
    }
    else{
        res.status(401);
        throw new Error("email or password is not valid");
    }
});

module.exports={registerUser,loginUser};