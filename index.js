const express =require("express");
const cors=require("cors");
const morgan=require("morgan");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middlewares/errorHandler");
const dotenv=require("dotenv").config();

connectDb();

const app = express();

const PORT =process.env.PORT || 3001;

app.use(express.json());


//middlewares
//app.use(cors());
//app.use(morgan('dev'));


app.use("/api/users",require("./routes/userRoutes"));
app.use("/api/restaurant",require("./routes/restaurantRoutes"));
app.use('/api/categories',require("./routes/categoryRoutes"));
app.use("/api/foods",require("./routes/foodRoutes"));
app.use("/api/place",require("./routes/orderRoutes"));

//app.use(errorHandler);

app.listen(PORT,()=>{
    console.log(`server is running on port:${PORT}`);
});