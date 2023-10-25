const jwt = require('jsonwebtoken')
const {Admin,User,Course} = require("../db")
const secretUser = "superS3cr3tUs3r";
const secretAdmin = "superS3cr3tAdmin";


//create the token
function createTokenUser (user){
    return jwt.sign({username : user.username,
                     password : user.password,
                     role : "user"},secretUser,{expiresIn : '1h'})
  }
  
  function createTokenAdmin (Admin){
    return jwt.sign({username : Admin.username,
                     password : Admin.password,
                     role : 'admin'},secretAdmin,{expiresIn : '1h'})
  }
  
  //middlewar to check user and admin 
  
  const AuthenticateUser = async (req,res,next)=>{
    const authHeader = (req.headers.authorization).split(' ')[1];
    if(authHeader){
      jwt.verify(authHeader,secretUser,async (err,user)=>{
        if (err){
         return res.status(404).json({message : "Unauthorized"})
        }else{
          const founduser = await User.findOne({username : user.username , password :  user.password})
          if(founduser){
              req.user = founduser
            next();
          }else{
            return res.status(404).json({message : "User Not Found "})
          }
          
        }
      })
    }
  
    else{
      res.status(401);
    }
     
  }
  const AuthenticateAdmin = async (req,res,next)=>{
    const authHeader = (req.headers.authorization).split(' ')[1];
    if(authHeader){
      try{
        const user = jwt.verify(authHeader,secretAdmin)
          const admin = await Admin.findOne({username : user.username , password :  user.password})
          if(admin){
              req.user = admin
              next();
          }else{
            return res.status(404).json({message : "Admin Not Found "})
          }
      }
      catch (error){
            return res.status(401).json({message : "Unauthorized"})
          }
    }
  
    else{
      res.status(401);
    }
     
  }
  
  module.exports = {
    createTokenUser,
   createTokenAdmin,

   AuthenticateUser,
   AuthenticateAdmin

  }