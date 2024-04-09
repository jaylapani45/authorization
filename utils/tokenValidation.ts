import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const tokenValidation = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ message: "unauthorized" });
  }
  try {
    const {_id} = jwt.verify(token, process.env.JWT_SECRET_KEY!) as any;
    req.body.userId = _id;
    
    next();
  } catch (err) {
    return res.status(500).json({ message: "not a Authorized", data: err });
  }
};
export default tokenValidation