const express = require('express');
const {Admin,Course} = require("../db")
const {createTokenAdmin,AuthenticateAdmin} = require("../middleware/auth")


const router = express.Router();

// Admin routes
router.post('/signup', async (req, res) => { //notes
    // logic to sign up admin
    const input= req.body;
    const admin = await Admin.findOne({username :input.username})  //notes
    if(admin){
      res.status(403).json({message : "Admin with this username already exists" });
    }else{
      const token = createTokenAdmin(input);
      const newAdmin = new Admin(input);
      await newAdmin.save()
      res.status(200).json({message : "Admin Created Successfully" , token : token})
    }
  
  });
  
  router.post('/login', async (req, res) => {
    // logic to log in admin
    // console.log("hi")
    const input= req.headers;
    // console.log(input.username)
    // console.log(input.password)
    const admin = await Admin.findOne({username : input.username , password : input.password})
    // console.log(admin)
    if(admin){
       const token = createTokenAdmin(input);
      res.status(200).json({message : "Logged in successfully", token : token})
  
    }else{
      res.status(403).json({message : "Incorrect Id or Password" });
    }
  
  
  });
  


  
  router.post('/courses',AuthenticateAdmin, async (req, res) => {
    // logic to create a course
    const course =  req.body;
    const newCourse = new Course(course)
    await newCourse.save();
    res.json({message : " Course Created Successfully" , courseId : newCourse.id})
    
  });
  
  router.put('/course/:courseId', AuthenticateAdmin, async(req, res) => {
    // logic to edit a course
    const course =  await Course.findByIdAndUpdate(req.params.courseId,req.body,{new : "true"})
    if(course){
         
      
      res.json({message : " Course Updated Successfully"})
  
    }else{
      res.status(404).json({ message: 'Course not found' });
    }
  
  });
  router.get('/course/:courseId', AuthenticateAdmin, async (req, res) => {
    // logic to get a course details
    const courseId = req.params.courseId;
  
    try {
      const course = await Course.findById(courseId);
      if (course) {
        res.status(200).json({course:course});
      } else {
        res.status(404).json({ message: 'Course not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
  
  router.get('/courses',AuthenticateAdmin, async (req, res) => {
    // logic to get all courses
    const courses = await Course.find({}); //notes
    res.json({courses})
  
  
  });
  
  router.get('/me' , AuthenticateAdmin,(req,res)=>{
    if (!req.user){
      res.status(403).json({message:"Admin Does Not Exists"})
    }
      res.json({
        username: req.user.username
      })
  })

  module.exports = router;