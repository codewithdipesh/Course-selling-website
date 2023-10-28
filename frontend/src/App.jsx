import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter
} from 'react-router-dom';

import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Signup from './Signup.jsx';
import Appbar from './Appbar.jsx';
import Signin from './Signin.jsx';
import CreateCourse from './CreateCourse';
import Courses from './Courses';
import Landing from "./Landing.jsx";
import Course from "./Course.jsx";

function App() {
  return (
    <div style={{  backgroundColor: "white" }}>
      <BrowserRouter>
        <Appbar/>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Signin />} />
          <Route path="/addcourse" element={<CreateCourse />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/course/:courseId" element={<Course />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
