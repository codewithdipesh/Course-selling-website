import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import { TextField } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';







function Courses() {
     const navigate = useNavigate()
    const[courses,setCourses] = useState([])

   const getCourses = async()=>{
    try{
      const response = await axios.get("http://localhost:3000/admin/courses",
      {
       headers:{
         'Content-Type': 'application/json',
         "Authorization":"Bearer " + localStorage.getItem("token")
       }
     })
    
     if(response.data.courses){
      setCourses(response.data.courses)
     }

    }catch(error){
      console.log("fetching error",error)
    }
   }


  useEffect(()=>{
       getCourses();
     },[])

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
  const {  title, description,price, imageLink } = props.course;
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
       <div
       style={{display:"flex",justifyContent:"space-between"}}>
       <div style={{marginLeft:10}}>
        <Button variant='contained'
         onClick={() => {
          props.navigate(`/course/${id}`);
        }}>EDIT</Button>
        </div>
        <div style={{marginRight:10}}>
          <Typography  fontFamily={"Arial"} fontSize={14}>Price</Typography>
          <Typography  fontFamily={"Arial"} fontSize={20} fontWeight={"Bold"}>${price}</Typography>
        </div>
       </div>
       

      </Card>
    </div>
  );
}


export default Courses