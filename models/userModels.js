const mongoose=require("mongoose");

const userSchema=mongoose.Schema(
    {
        username:{
            type:String,
            require:[true,"user name is required"],
        },

        email:{
            type:String,
            require:[true,"email is required"],
            unique:[true,"Email address already exist"],
        },
        password:{
            type:String,
            require:[true,"password os required"],
        },
        address:{
            type:Array,
        },
        phone:{
            type:String,
            require:[true,"phone number is required"],
        },
        usertype:{
            type:String,
            require:[true,"user type is required"],
        },
    },
    {
        timestamp:true
    }

);

module.exports=mongoose.model("User",userSchema);