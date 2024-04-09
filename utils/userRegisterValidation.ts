import Joi from "joi";
import { Request,Response,NextFunction } from "express";
const UserRegisterValidation = (req:Request,res:Response,next:NextFunction)=>{
    const schema = Joi.object({
        userName:Joi.string().min(4).max(15).required(),
        email:Joi.string().email().required(),
        password:Joi.string().min(4).alphanum().required()
    })
    const {error,value} = schema.validate(req.body)
    if(error){
        return res.status(400).json({message:"bad reques", error})
    }
    next();
}
export default UserRegisterValidation