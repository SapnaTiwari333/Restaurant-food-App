const express=require("express");
const { createCategory, getCategory, getCategoryById, updateCategoryById, deleteCategoryById } = require("../controllers/categoryController");


const router=express.Router();

router.post("/create",createCategory);

router.get("/search",getCategory);

router.get("/:id",getCategoryById);

router.put("/update/:id",updateCategoryById);

router.delete("/delete/:id",deleteCategoryById);




module.exports=router;