const mongoose=require("mongoose");
const asyncHandler=require("express-async-handler");
const Food=require("../models/foodModel");


//@desc create food
//@route POST api/foods/create
//@public

const createFood=asyncHandler(async(req,res)=>{
    const{ title,description,price,foodtype ,category,code,isAvailable,restaurant,rating,ratingcount}=req.body;
    if(!title ||!description ||!price ||!foodtype||!category ||!code ||!isAvailable||!restaurant||!rating||!ratingcount){
        res.status(400);
        throw new Error("All fields are required");
    }

    const food=await Food.create({
        title,description,price,foodtype,
        category,code,isAvailable,restaurant,
        rating,ratingcount
    });

    console.log(`food is creted ${food}`);

    if(food){
        res.status(201).json({_id:food.id,name:food.title})
    }
    else{
        res.status(400);
        throw new Error("Food data is not valid");
    }
});

module.exports={createFood};