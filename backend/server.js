const app=require("./app"); 
const connectdatabase=require("./config/database");
const cloudinary =require("cloudinary")
const dotenv=require("dotenv");
dotenv.config({path:"config/config.env"})

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });


//handle uncaught exception
process.on("uncaughtException",(err)=>{
    console.log(`Error:${err.message}`);
    console.log(`Shutting down the server due to uncaughtexception`);
    process.exit(1);
})


dotenv.config({path:"backend/config/config.env"});
connectdatabase();


app.listen(process.env.PORT,()=>{
    console.log(`server is working on http://localhost:${process.env.PORT}`);
})