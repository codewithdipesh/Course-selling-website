import express from 'express';
import {User,Course} from "../db"
import {createTokenUser,AuthenticateUser} from "../middleware/auth"

const userRouter = express.Router()

interface userinput{
  username :string;
  password:string
}


// User routes
userRouter.post('/signup', async (req, res) => {
    // logic to sign up user
    const input:userinput= req.body;
    const user = await User.findOne({username :input.username})  //notes
    if(user){
      res.json({mesage : "User with this username already exists" });
    }else{
      const token = createTokenUser(input);
      const newUser = new User(input);
      await newUser.save()
      res.json({message : "User Created Successfully" , token : token})
    }
  });
  
  userRouter.post('/login', async (req, res) => {
    // logic to log in user
    if(!req.headers){
      return res.sendStatus(403);
    }
    if(typeof req.headers.username !== "string" || typeof req.headers.password !== "string"){
      return res.sendStatus(403);
    }
    const input:userinput= {
      username:req.headers.username,
      password:req.headers.password
    }
    const user =await User.findOne({username : input.username , password : input.password})
    if(user){
       const token = createTokenUser(input);
      res.json({message : "Logged in successfully", token : token})
  
    }else{
      res.json({message : "Incorrect Id or Password" });
    }
  });
  
  userRouter.get('/courses',AuthenticateUser, async (req, res) => {
    // logic to list all courses
    const courses = await Course.find({published : "true"}) //notes
    res.json({courses})
  
  
  });
  
  userRouter.post('/course/:courseId', AuthenticateUser,async (req, res) => {
    // logic to purchase a course
    if (!req.headers.user_id){
      return res.status(403).json({message:"User Does Not Exists"})
    }
    const user = await User.findById(req.headers.user_id)
    if(!user){
      return  res.status(403).json({message:"User Does Not Exists"})
    }
    const course = await Course.findById(req.params.courseId)
    if(!course){
     return res.json({message : "Course Not Found "})
    }
    if(typeof course === "string"){
      return res.json({message : "Course Not Found "})
    }
      user.purchasedCourses.push(course._id)
      await user.save()
      res.json({message :  " Successfully bought the Course"});
    
    
  
  });
  
  userRouter.get('/purchasedCourses',AuthenticateUser, async  (req, res) => {
    // logic to view purchased courses
    if (!req.headers.user_id){
      return res.status(403).json({message:"User Does Not Exists"})
    }
    const user = await User.findById(req.headers.user_id)
    if(!user){
      return  res.status(403).json({message:"User Does Not Exists"})
    }
    res.json({ purchasedCourses: user.purchasedCourses || [] });
  });


export default userRouter