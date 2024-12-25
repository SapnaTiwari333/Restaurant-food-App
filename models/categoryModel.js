const mongoose=require("mongoose");


const categorySchema=mongoose.Schema({
    title:{
        type:String,
        require:[true,"category name is required"],
    },
    
},
{
    timestamps:true
}
);

module.exports=mongoose.model("Category",categorySchema);