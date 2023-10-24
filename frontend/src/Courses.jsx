import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import { TextField } from '@mui/material';
import { useEffect } from 'react';


export function Course (props) {
  return <div>
     <Card
     style={{
      margin:10,
      width :300,
      minHeight:200
     }}>
   
    <Typography textAlign={"center"} varient={"h6"} fontFamily={"Arial"} fontWeight={"bold"} > {props.course.title}</Typography>
    <br/>
    <br/>
    <Typography textAlign={"center"} varient={"subtitle1"} fontFamily={"Arial"} fontWeight={"bold"}> {props.course.description}</Typography>
    <img src={props.course.imageLink} style={{width:300,height:200}}></img>
     </Card>
  </div>
}







function Courses() {
 
    const[courses,setCourses] = useState([])
  useEffect(()=>{
    function call2(data){
      setCourses(data.courses);
      }   
        
     function call1(res){
        res.json().then(call2)
     }
        fetch("http://localhost:3000/admin/courses",{
          method :"GET",
          headers:{
            'Content-Type': 'application/json',
            "Authorization":"Bearer " + localStorage.getItem("token")
          }
        }).then(call1)
        
  })

  return (
    <>  
     

     <Typography textAlign={"center"} varient={"h8"} fontFamily={"Arial"} fontWeight={"bold"} > Courses</Typography>
     <div style={{display :"flex",flexWrap:"wrap",  justifyContent :"center" ,padding:50}}>
     
        {courses.map(course=>{
          return <Course course = {course}/>
        })}
     </div>
     
    </>
  )

 



}

export default Courses