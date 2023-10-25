import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import { TextField } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';









function Courses() {
     const navigate = useNavigate()
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
        
         return <Course id={course._id} course={course} navigate={navigate} />;
        })}
     </div>
     
    </>
  )

 



}




function Course(props) {
  const {  title, description, imageLink } = props.course;
  const id = props.id
  return (
    <div>
      <Card
        style={{
          margin: 10,
          width: 300,
          minHeight: 200
        }}>
        <Typography textAlign={"center"} varient={"h6"} fontFamily={"Arial"} fontWeight={"bold"}>{title}</Typography>
        <br />
        <br />
        <Typography textAlign={"center"} varient={"subtitle1"} fontFamily={"Arial"} fontWeight={"bold"}>{description}</Typography>
        <img src={imageLink} style={{ width: 300, height: 200 }} alt="Course" />
        <Button onClick={() => {
          props.navigate(`/course/${id}`);
        }}>See Details</Button>
      </Card>
    </div>
  );
}


export default Courses