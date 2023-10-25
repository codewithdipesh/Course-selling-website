const express = require('express');
const {User,Course} = require("../db")
const {createTokenUser,AuthenticateUser} = require("../middleware/auth")

const router = express.Router()




// User routes
router.post('/signup', async (req, res) => {
    // logic to sign up user
    const input= req.body;
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
  
  router.post('/login', async (req, res) => {
    // logic to log in user
    const input= req.headers;
    const user =await User.findOne({username : input.username , password : input.password})
    if(user){
       const token = createTokenUser(input);
      res.json({message : "Logged in successfully", token : token})
  
    }else{
      res.json({message : "Incorrect Id or Password" });
    }
  });
  
  router.get('/courses',AuthenticateUser, async (req, res) => {
    // logic to list all courses
    const courses = await Course.find({published : "true"}) //notes
    res.json({courses})
  
  
  });
  
  router.post('/course/:courseId', AuthenticateUser,async (req, res) => {
    // logic to purchase a course
    const user = await User.findOne({username : req.user.username , password :  req.user.password})
    const course = await Course.findOne({id : Number(req.params.courseId) , published : "true" })
    if(course){
      user.purchasedCourses.push(course)
      await user.save()
      res.json({message :  " Successfully bought the Course"});
    }
    else{
      res.json({message : "Course Not Found "})
    }
  
  
  });
  
  router.get('/purchasedCourses',AuthenticateUser, async  (req, res) => {
    // logic to view purchased courses
    const user = await User.findOne({username : req.user.username , password :  req.user.password})
    res.json({ purchasedCourses: user.purchasedCourses || [] });
  });


  module.exports = router