import mongoose from 'mongoose';
const url = process.env.MONGO_URL || "none";

mongoose.connect(url)
.then(()=>{
    console.log('connected to database')
})
.catch((err:Error)=>{
    console.log(err)
})