import React, { useState, useEffect } from 'react';
import {Card,Typography,Button,TextField} from '@mui/material'
import { useParams } from "react-router-dom";


function Course() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      async function fetchCourse() {
          try {
              const response = await fetch(`http://localhost:3000/admin/course/${courseId}`, {
                  method: "GET",
                  headers: {
                      'Content-Type': 'application/json',
                      "Authorization": "Bearer " + localStorage.getItem("token")
                  }
              });

              if (response.status === 200) {
                  const data = await response.json();
                  setCourse(data);
              } else if (response.status === 404) {
                  setCourse(null);
              } else {
                  // Handle other error cases
              }
          } catch (error) {
              console.error(error);
              // Handle fetch error
          } finally {
              setLoading(false);
          }
      }

      fetchCourse();
  }, [courseId]);

  if (loading) {
      return (
          <div style={{paddingTop:300}}>
              <Typography textAlign={"center"} variant={"subtitle1"} fontFamily={"Arial"} fontWeight={"bold"}>Loading......</Typography>
          </div>
      );
  }

  if (course === null) {
      return (
          <div>
              <Typography textAlign={"center"} variant={"subtitle1"} fontFamily={"Arial"} fontWeight={"bold"}>404 NOT FOUND</Typography>
          </div>
      );
  }

  return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: 100 }}>
          <div>
              <CourseCard course={course} />
          </div>
          <div>
              <UpdatedCard course={course} setCourse={setCourse} />
          </div>
      </div>
  );
}





function UpdatedCard(props) {

  const[title,settitle] = useState("")
  const[description,setdescription] = useState("")
  const[price,setprice] = useState(0)
  const[imageLink,setImage] = useState("")
  const course = props.course
  const { courseId } = useParams();
  

  return (
    <>  <div style={{display:"flex",justifyContent:"center"}}>
      
      <Card  variant='outlined' style={{width:400,padding:15 ,margin:10}}> 
         
      <div style={{display:"flex",justifyContent:"center"}}>
         <Typography varient={"h2"} fontFamily={"Arial"} fontWeight={"bold"}>Update Course Details</Typography>
      </div>
      <TextField
        fullWidth={true}
        label="Title"
        variant="outlined"
        onChange={(event)=>{
            settitle(event.target.value)
        }}
      />
      <br/>
      <br/>
      <TextField
        fullWidth={true}
        label="Description"
        variant="outlined"
        onChange={(event)=>{
          setdescription(event.target.value)
        }}
      />
      <br/>
      <br/>
      <TextField
        fullWidth={true}
        label="Price"
        variant="outlined"
        onChange={(event)=>{
          setprice(Number(event.target.value))
        }}
      />
  
      <br/>
      <br/>
      <TextField
        fullWidth={true}
        label="ImageLink"
        variant="outlined"
        onChange={(event)=>{
          setImage(event.target.value)
        }}
      />
  

        <div  style={{
          margin:5,
          display:"flex",
          justifyContent:"center"
        }}>

       <Button
        variant="contained"
        size={"large"}
       
        onClick= {()=>{

          function call2(data){
            props.setCourse(data)
        }    
            
         function call1(res){
            res.json().then(call2)
         }

            fetch(`http://localhost:3000/admin/course/${courseId}`, {
            method: "PUT",
            body: JSON.stringify({
             title,
             description,
             price,
             imageLink,
             published:true
            }),
            headers: {
              "Content-type": "application/json",
              "Authorization": "Bearer " + localStorage.getItem("token")
            }
          }).then(call1);
            
        }}
      >
       Update Course
      </Button>
      </div> 

          
     </Card>


    </div>
    
     
     
    </>
  )
}




function CourseCard(props){
   
  const course = props.course
  return  (
    
    <div style={{display:"flex",
    justifyContent : "center"}}>

<Card
   variant='outlined' style={{width:400,padding:15 ,margin:10,minHeight:350}}>
  <Typography textAlign={"center"} variant={"h6"} fontFamily={"Arial"} fontWeight={"bold"}>{course.title}</Typography>
  <br />
  <br />
  <Typography textAlign={"center"} variant={"subtitle1"} fontFamily={"Arial"} fontWeight={"bold"}>{course.description}</Typography>
  <img src={course.imageLink} alt="Course Image" style={{ width: 400, height: 225 }} />
</Card>

    </div>
    
    

  )
}

export default Course;

