import  express from 'express';
import  {Admin,Course} from "../db"
import {createTokenAdmin,AuthenticateAdmin} from "../middleware/auth"


const adminRouter = express.Router();


interface userinput{
  username :string;
  password:string
}

// Admin routes
adminRouter.post('/signup', async (req, res) => { //notes
   try{
    const input:userinput= req.body;
    const admin = await Admin.findOne({username :input.username})  //notes
    if(admin){
      res.status(403).json({message : "Admin with this username already exists" });
    }else{
      const token = createTokenAdmin(input);
      const newAdmin = new Admin(input);
      await newAdmin.save()
      res.status(200).json({message : "Admin Created Successfully" , token : token})
    }
  

   }catch(error){
    res.sendStatus(403);
   } 
    
  });
  
  adminRouter.post('/login', async (req, res) => {
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
    const admin = await Admin.findOne({username : input.username , password : input.password})
    // console.log(admin)
    if(admin){
       const token = createTokenAdmin(input);
      res.status(200).json({message : "Logged in successfully", token : token})
  
    }else{
      res.status(403).json({message : "Incorrect Id or Password" });
    }
  
  
  });
  


  
  adminRouter.post('/courses',AuthenticateAdmin, async (req, res) => {
    // logic to create a course
    const course =  req.body;
    const newCourse = new Course(course)
    await newCourse.save();
    res.json({message : " Course Created Successfully" , courseId : newCourse.id})
    
  });
  
  adminRouter.put('/course/:courseId', AuthenticateAdmin, async(req, res) => {
    // logic to edit a course
    const course =  await Course.findByIdAndUpdate(req.params.courseId,req.body,{new : true})
    if(course){
         
      
      res.json({message : " Course Updated Successfully"})
  
    }else{
      res.status(404).json({ message: 'Course not found' });
    }
  
  });
  adminRouter.get('/course/:courseId', AuthenticateAdmin, async (req, res) => {
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
  
  
  adminRouter.get('/courses',AuthenticateAdmin, async (req, res) => {
    // logic to get all courses
    const courses = await Course.find({}); //notes
    res.json({courses})
  
  
  });
  
  adminRouter.get('/me' , AuthenticateAdmin,async(req,res)=>{
    if (!req.headers.user_id){
      res.status(403).json({message:"Admin Does Not Exists"})
    }
    const admin = await Admin.findById(req.headers.user_id)
    if(!admin){
      return res.sendStatus(403)
    }
      res.json({
        username : admin.username
      })
  })

  export default adminRouter;