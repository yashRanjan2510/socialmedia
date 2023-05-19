const express=require("express");
const app=express();
const cookiepasrse=require("cookie-parser")
const path=require("path")

//middleware
app.use(express.json({limit:"50mb"}));
app.use(express.urlencoded({limit:"50mb",extended:true}));
app.use(cookiepasrse())


//importing routes
const post=require("./routes/postroute");
const user=require("./routes/userroute");

app.use("/api/v1",post);
app.use("/api/v1",user);

app.use(express.static(path.join(__dirname,"../frontend/build")));
app.get("*", (req,res)=>{
    res.sendFile(path.resolve(__dirname,"../frontend/build/index.html"))
})

//middleware for error

module.exports=app;