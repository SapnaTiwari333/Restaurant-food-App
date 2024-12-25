const mongoose=require("mongoose");

const restaurantSchema=mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,"Restaurant name is required"],

        },
        imageUrl:{
            type:String,
        },
        foods:{
            type:Array,
        },
        time:{
            type:String,
        },
        pickup:{
            type:Boolean,
            default:true
        },
        delivery:{
            type:Boolean,
            default:true,
        },
        isOpen:{
            type:Boolean,
            default:true
        },
        rating:{
            type:Number,
            default:1,
            min:1,
            max:5
        },
        ratingcount:{
            type:String,
        },
        code:{
            type:String,
        },
        coords:{
            id:{
                type:String,
            },
            address:{
                type:String,
            }
        }
    },{
        timestamps:true
    }
);

module.exports=mongoose.model("Restaurant",restaurantSchema);