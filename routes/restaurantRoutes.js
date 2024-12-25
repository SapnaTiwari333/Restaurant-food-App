const express=require("express");
const {newRestaurant,getRestaurant,getRestaurantById}=require("../controllers/restaurantController");

const router=express.Router();

router.post("/create",newRestaurant);

router.get("/search",getRestaurant);

router.get("/:id",getRestaurantById);


module.exports=router;