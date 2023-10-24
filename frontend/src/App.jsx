import {BrowserRouter as Router,Routes,Route, BrowserRouter} from'react-router-dom'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Signup from './Signup.jsx'
import Appbar from './Appbar.jsx'
import Signin from './Signin.jsx'
import CreateCourse from './CreateCourse'
import Courses from './Courses'
import Home from "./Home.jsx"
import Course from "./Course.jsx"

function App() {
  
  return (
    <>
       
      <div style={{width:"100vw",height:"100vh",backgroundColor:"#e0ecdd"}}>
          <BrowserRouter>
            <Appbar/>

             
             <Routes>
                 
                 <Route path ="/signup" element={<Signup/>}></Route>
                 <Route path ="/home" element={<Home/>}></Route>
                 <Route path ="/login" element={<Signin/>}></Route>
                 <Route path ="/addcourse" element={<CreateCourse/>}></Route>
                 <Route path ="/courses" element={<Courses/>}></Route>
                 <Route path ="/course/:courseId" element={<Course/>}></Route>
                 
                
                
             </Routes>
          </BrowserRouter>
      </div>
     
    </>
  )
}

export default App
