import jwt  from 'jsonwebtoken'
import {Admin,User,Course} from "../db"
const secretUser = "superS3cr3tUs3r";
const secretAdmin = "superS3cr3tAdmin";
import { Request,Response,NextFunction } from 'express';

interface userinput{
  username :string;
  password:string
}

//create the token
export function createTokenUser (user:userinput){
    return jwt.sign({username : user.username,
                     password : user.password,
                     role : "user"},secretUser,{expiresIn : '1h'})
  }
  
  export function createTokenAdmin (Admin:userinput){
    return jwt.sign({username : Admin.username,
                     password : Admin.password,
                     role : 'admin'},secretAdmin,{expiresIn : '1h'})
  }
  
  //middlewar to check user and admin 
  
  export const AuthenticateUser = async (req:Request,res:Response,next:NextFunction)=>{
    
    if(!req.headers.authorization){
      return res.sendStatus(403)
    }
    const authHeader = (req.headers.authorization).split(' ')[1];
    if(authHeader){
      jwt.verify(authHeader,secretUser,async (err,payload)=>{
        if (err){
         return res.status(404).json({message : "Unauthorized"})
        }
        if(!payload){
          return res.sendStatus(403)
        }
        if(typeof payload === "string"){
          return res.sendStatus(403)
        }
        const founduser = await User.findOne({username : payload.username , password :  payload.password})
        if(!founduser){
          return res.status(404).json({message : "User Not Found "})
        }
        if(typeof founduser === "string"){
          return res.status(404).json({message : "User Not Found "})
        }
        req.headers["user_id"] = payload._id
        next();
      })
    }
  
    else{
      res.status(401);
    }
     
  }
  export const AuthenticateAdmin = async (req:Request,res:Response,next:NextFunction)=>{
    if(!req.headers.authorization){
      return res.sendStatus(403)
    }
    const authHeader = (req.headers.authorization).split(' ')[1];
    if(authHeader){
          jwt.verify(authHeader,secretAdmin,async (err,payload)=>{
          if (err){
            return res.status(404).json({message : "Unauthorized"})
           }
           if(!payload){
             return res.sendStatus(403)
           }
           if(typeof payload === "string"){
             return res.sendStatus(403)
           }
           const admin = await Admin.findOne({username : payload.username , password :  payload.password})
           if(!admin){
            return res.status(404).json({message : "Admin Not Found "})
           }
           if(typeof admin === "string"){
            return res.status(404).json({message : "User Not Found "})
          }

          req.headers['user_id'] = payload._id
           next();

        })
      }

    else{
      res.status(401);
    }
     
  }
  
 