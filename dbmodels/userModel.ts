import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName:{
        type: String,
        required: true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

export const userModel = mongoose.model("users",userSchema)