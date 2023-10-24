const express = require('express');
const jwt = require("jsonwebtoken")
const bodyParser = require("body-parser")
const cors = require('cors');
const mongoose =  require("mongoose");//import
const app = express();


app.use(express.json());
app.use(cors())
app.use(bodyParser.json());
const secretUser = "superS3cr3tUs3r";
const secretAdmin = "superS3cr3tAdmin";

// let ADMINS = [];
// let USERS = [];
// let COURSES = [];


//mongoose schema


const userSchema =  new mongoose.Schema({
    username : String,
    password: String,
    purchasedCourses : [{type :mongoose.Schema.Types.ObjectId, ref: 'Course'}]
})

const AdminSchema = new mongoose.Schema({
  username : String,
  password: String
})

const courseSchema = new mongoose.Schema({
  title : String,
  description: String,
  price: Number,
  imageLink : String,
  published: Boolean
})


//Define mongoos emodel 

const User = mongoose.model('User',userSchema);
const Admin = mongoose.model('Admin' , AdminSchema)
const Course = mongoose.model('Course' , courseSchema)


//cONNECT TO MongoDB
//Dont misuse it
mongoose.connect('mongodb+srv://paldipakdipa2020:dipeshMongo@cluster0.wnwq78z.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
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

// Admin routes
app.post('/admin/signup', async (req, res) => { //notes
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

app.post('/admin/login', async (req, res) => {
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

app.post('/admin/courses',AuthenticateAdmin, async (req, res) => {
  // logic to create a course
  const course =  req.body;
  const newCourse = new Course(course)
  await newCourse.save();
  res.json({message : " Course Created Successfully" , courseId : newCourse.id})
  
});

app.put('/admin/courses/:courseId', AuthenticateAdmin, async(req, res) => {
  // logic to edit a course
  const course =  await Course.findByIdAndUpdate(req.params.courseId,req.body,{new : "true"})
  if(course){
       
    
    res.json({message : " Course Updated Successfully"})

  }else{
    res.status(404).json({ message: 'Course not found' });
  }

});
app.get('/admin/courses/:courseId', AuthenticateAdmin, async(req, res) => {
  // logic to get a course details
  const course =  await Course.findById(Number(req.params.courseId))
  if(course){
       
    res.status(200).json(course);

  }else{
    res.status(404).json({ message: 'Course not found' });
  }

});

app.get('/admin/courses',AuthenticateAdmin, async (req, res) => {
  // logic to get all courses
  const courses = await Course.find({}); //notes
  res.json({courses})


});

app.get('/admin/me' , AuthenticateAdmin,(req,res)=>{
    res.json({
      username: req.user.username
    })
})

// User routes
app.post('/users/signup', async (req, res) => {
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

app.post('/users/login', async (req, res) => {
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

app.get('/users/courses',AuthenticateUser, async (req, res) => {
  // logic to list all courses
  const courses = await Course.find({published : "true"}) //notes
  res.json({courses})


});

app.post('/users/courses/:courseId', AuthenticateUser,async (req, res) => {
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

app.get('/users/purchasedCourses',AuthenticateUser, async  (req, res) => {
  // logic to view purchased courses
  const user = await User.findOne({username : req.user.username , password :  req.user.password})
  res.json({ purchasedCourses: user.purchasedCourses || [] });
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
