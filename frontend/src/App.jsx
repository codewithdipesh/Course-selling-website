import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter
} from 'react-router-dom';

import { useEffect } from 'react';

import './App.css';
import Signup from './Signup.jsx';
import Appbar from './Appbar.jsx';
import Signin from './Signin.jsx';
import CreateCourse from './CreateCourse';
import Courses from './Courses';
import Landing from "./Landing.jsx";
import Course from "./Course.jsx";
import {
  RecoilRoot,
  useSetRecoilState
 
} from 'recoil';
import { userState } from './Store/atoms/user';
import axios from "axios"

function App() {
  return (
    <div style={{  backgroundColor: "white" }}>
    <RecoilRoot>
    <BrowserRouter>
        <Appbar/>
        <InitUser/>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Signin />} />
          <Route path="/addcourse" element={<CreateCourse />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/course/:courseId" element={<Course />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
      
    </div>
  );
}


function InitUser(){

const setUser = useSetRecoilState(userState)

const init = async () => {
  try {
    const response = await axios.get("http://localhost:3000/admin/me", {
      headers: {
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    });

    if (response.data.username) {
      setUser({
        isLoading:false,
        userEmail:response.data.username
      })
    }else{
      setUser({
        isLoading:false,
        userEmail:null
      })
    }
  } catch (error) {
    console.log("fetching error",error)
    setUser({
      isLoading:false,
      userEmail:null
    })
  }
}

useEffect(() => {
  init();
}, []);


return(
<></>)



}

export default App;
