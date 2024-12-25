const asyncHandler=require("express-async-handler");
const Category=require("../models/categoryModel");
const mongoose = require('mongoose');


//@desc create new category
//@route POST api/categories/create
//@private

const createCategory=asyncHandler(async(req,res)=>{
    const{title}=req.body;
    if(!title){
        res.status(400);
        throw new Error("title is required");
    }

    const category=await Category.create({
        title,
    });

    console.log(`Category is created ${category}`);

    if(category){
         res.status(201).send({
            _id:category.id,
            title:category.title
         });

    }else{
        res.status(400);
        throw new Error("category data is not valid");
    }
});

//@desc get all categories
//@route GET /api/categories/search
//@public

const getCategory=asyncHandler(async(req,res)=>{
    const searchCategory=await Category.find({});
    if(!searchCategory){
        res.status(404);
        throw new Error("No category is found");
    }

    res.status(200).send({
        totalcount:searchCategory.length,
        searchCategory
    });
});

//@desc get particular category
//@route GET /api/categories/:id
//@public

const getCategoryById = asyncHandler(async (req, res) => {
    const { id } = req.params; // Extract the ID from the request parameters

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400);
        throw new Error("Invalid category ID");
    }

    // Find the category by ID
    const category = await Category.findById(id);

    if (!category) {
        res.status(404);
        throw new Error("Category not found");
    }

    res.status(200).send({
        category
    });
});


//@desc update category
//@route PUT /api/category/update/:id
//@public

const updateCategoryById=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    const updateData=req.body;

   

    const updateCategory=await Category.findByIdAndUpdate(
        id,updateData,{new: true, runValidators: true}
   
    );
    if(!updateCategory){
        res.status(404);
        throw new Error("Category not found");
    }

    res.status(200).send({
        updateCategory
    });

});

//@desc delete category
//@route DELETE api/categories/delete/:id
//@public

const deleteCategoryById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400);
        throw new Error("Invalid category ID");
    }

    // Find and delete the category
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
        res.status(404); 
        throw new Error("Category not found");
    }

    res.status(200).json({
        success: true,
        message: "Category deleted successfully"
    });
});




module.exports={createCategory,getCategory,getCategoryById,updateCategoryById,deleteCategoryById};