const asyncHandler=require("express-async-handler");
const Restaurant=require("../models/resturantModel");
const mongoose=require("mongoose");


//@desc create new restaurant
//@route post api/restaurant/ceate
//@public

const newRestaurant=asyncHandler(async(req,res)=>{
    const{name,imageUrl,foods, time,pickup,delivery,isOpen,rating,ratingcount,code,coords}=req.body;

    if(!name || !imageUrl ||!foods || !time ||!pickup ||!delivery ||!isOpen ||!rating ||!ratingcount ||!code ||!coords){
        res.status(400);
        throw new Error("All fields are required");
    }

    //create new restaurant

    const restaurant=await Restaurant.create({
        name,
        imageUrl,
        foods, 
        time,
        pickup,
        delivery,
        isOpen,
        rating,
        ratingcount,
        code,
        coords

    });

    console.log(`Restaurant created ${restaurant}`);

    //send information to the user

    if(restaurant){
        res.status(201).json({
            _id:restaurant.id,name:restaurant.name
        });
    }else{
        res.status(400);
        throw new Error("restaurant data is not valid");
    }
});

//@desc get all restaurant
//@desc GET api/restaurant/search
//@public

const getRestaurant=asyncHandler(async(req,res)=>{
    const searchRestaurant=await Restaurant.find({});
    if(!searchRestaurant){
        res.status(404);
        throw new Error("NO restaurant available");
    }
    res.status(200).json({
        totalCount:searchRestaurant.length,
        searchRestaurant,
    })
});


//@desc get particluar restaurant
//@route GET api/restaurant/:id
//@public


const getRestaurantById = asyncHandler(async (req, res) => {
    const { id } = req.params; 

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400);
        throw new Error("Invalid category ID");
    }

    // Find the category by ID
    const restaurant = await Restaurant.findById(id);

    if (!restaurant) {
        res.status(404);
        throw new Error("Restaurant is not found");
    }

    res.status(200).json({
        restaurant
    });
});
  
module.exports={newRestaurant,getRestaurant,getRestaurantById};