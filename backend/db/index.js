
const mongoose =  require("mongoose");//import


//Define mongoose schemas

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


//Define mongoos model 

const User = mongoose.model('User',userSchema);
const Admin = mongoose.model('Admin' , AdminSchema)
const Course = mongoose.model('Course' , courseSchema)

module.exports = {
    User,
    Admin,
    Course
}
