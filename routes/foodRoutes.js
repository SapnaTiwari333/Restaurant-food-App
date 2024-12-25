const express=require("express");
const { createFood } = require("../controllers/foodController");

const router=express.Router();

router.post("/create",createFood);

module.exports=router;