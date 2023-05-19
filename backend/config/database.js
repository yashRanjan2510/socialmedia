const mongoose=require('mongoose')

module.exports= async ()=>{
    const mongouri=process.env.MONGO_URL
    try{
       await mongoose.connect(mongouri,{
            useUnifiedTopology:true,
            useNewUrlParser:true
        })
        console.log(`Database connected `)
    }
    catch(error){
         console.log(error)
         process.exit(1)
    }
} 