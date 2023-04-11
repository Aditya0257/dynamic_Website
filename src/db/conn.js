const mongoose = require("mongoose");

//? creating a database

mongoose.set('strictQuery', false);

mongoose.connect("mongodb://localhost:27017/websiteDatabase",{
    
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=> {
    console.log("mongodb connection successful ...");
}).catch((err) => {
    console.log(err.toString());
})