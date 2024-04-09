import { userModel } from "../dbmodels/userModel";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req: Request, res: Response) => {
  const UserModel = new userModel(req.body);
  UserModel.password = await bcrypt.hash(req.body.password, 10);
  try {
    const response = await UserModel.save();
    return res.status(201).json({ message: "success", data: response });
  } catch (err) {
    return res.status(500).json({ message: "error", data: err });
  }
};
export const loginUser = async (req: Request, res: Response) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    const isValidPassword = await bcrypt.compare(
      req.body.password,
      user.password!
    );
    console.log(isValidPassword);
    if (!isValidPassword) {
      return res.status(400).json({ message: "invalid password" });
    }

    const tokenObject = {
      _id: user._id,
      userName: user.userName,
      email: user.email,
    };

    const jwtToken = jwt.sign(
      tokenObject,
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: "1h" }
    );
    return res
      .status(200)
      .json({ message: "success", token: jwtToken, user: tokenObject });
  } catch (err) {
    return res.status(500).json({ message: "error", data: err });
  }
};

export const logoutUser = async (req: Request, res: Response) => {
  try{
    const user = await userModel.findById(req.body.userId).select("-password");
    
    if(!user){
      return res.status(404).json({message:"user not found"})
    }
    const token = req.body.userId;
    if(!token){
      return res.status(401).json({message:"unauthorized"})
    }
    const jwtToken2 = jwt.sign({_id:user._id}, process.env.JWT_SECRET_KEY as string, { expiresIn: 0 });

    return res.status(200).json({message:"Logged Out Successfully"})
  }catch(err){
    return res.status(500).json({ message: "error", data: err });
  
  }
}

export const changePassword = async (req: Request, res: Response) => {
  try{
    const user = await userModel.findById(req.body.userId).select("-password");

    if(!user){
      return res.status(404).json({message:"user not found"})
    }

    const newPassword = await bcrypt.hash(req.body.newPassword, 10);
    
    await user.updateOne({password:newPassword})

    return res.status(200).json({message:"Password Changed Successfully",data:user})
    
   
  }catch(err){
    return res.status(500).json({ message: "error", data: err });
  }
}