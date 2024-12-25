const mongoose=require("mongoose");

const orderSchema=new mongoose.Schema({
    customer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    items:[
        {
            food:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Food",
                require:true
            },
            quantity:{
                type:Number,
                require:[true,"quantity is required"],
                min:1
            },
            price:{
                type:Number,
                require:[true,"price is required"],
            }
        }
    ],

    totalPrice:{
        type:Number,
        require:true,
        min:0,
    },
    orderstatus:{
        type:String,
        enum: ["Pending","Preparing","Ready","Completed","Cancelled"],
        default:"Pending",
    },
    orderdate:{
        type:Date,
        default:Date.now
    },
    deliveryaddress:{
        type:String,
        required:true,
    },
    patmentstatus:{
        type:String,
        enum:["Credit card","Debit Card","Cash","Online Payment"],
        require:true,
    },
   
});

module.exports=mongoose.model("Oder",orderSchema);