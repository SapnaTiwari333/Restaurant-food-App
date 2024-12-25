const mongoose=require("mongoose");

const foodSchema=mongoose.Schema(
    {
        title:{
            type:String,
            require:[true,"Food name is required"],
        },
        description:{
            type:String,
            require:[true,"Food description is requird"],
        },
        price:{
            type:String,
            require:[true,"Food price is required"],
        },
        foodtype:{
            type:String,
        },
        category:{
            type:String,
        },
        code:{
            type:String,
        },
        isAvailable:{
            type:String,
            default:true,
        },
        restaurant:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Restaurant"
        },
        rating:{
            type:Number,
            default:5,
            min:1,
            max:5,
        },
        ratingcount:{
            typr:String,
        },
    },
    {
        timestamps:true
    }
);

module.exports=mongoose.model("Food",foodSchema);