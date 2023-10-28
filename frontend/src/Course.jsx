import React, { useState, useEffect } from 'react';
import {Card,Typography,Button,TextField,Grid} from '@mui/material'
import { useParams } from "react-router-dom";
import axios from "axios"


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

  return (<>
  <GrayTopper course={course}/>

    <Grid container>
      <Grid item sm={12} md={12} lg={8}>
          <UpdatedCard course={course} setCourse={setCourse} courseId={courseId}/>

       </Grid>
          
     <Grid item sm={12} md={12} lg={4}>
     <CourseCard course={course} />
      </Grid>
    </Grid>
     
      </>
  );
}





function UpdatedCard(props) {
  const course = props.course
  const[title,settitle] = useState(course.title)
  const[description,setdescription] = useState(course.description)
  const[price,setprice] = useState(course.price)
  const[imageLink,setImage] = useState(course.imageLink)
  const { courseId } = useParams();
  

  return (
    <>  <div style={{display:"flex",justifyContent:"center"}}>
      
      <Card  variant='outlined'  style={{width:"80%",padding:15 ,maxWidth: 600, marginTop: 200}}> 
         
      <div style={{display:"flex",justifyContent:"center"}}>
         <Typography varient={"h2"} fontFamily={"Arial"} fontWeight={"bold"}>Update Course Details</Typography>
      </div>
      <TextField
        value={title}
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
        value={description}
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
        value={price}
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
        value={imageLink}
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

          const update = async ()=>{
            try{
              const response = await axios.put(`http://localhost:3000/admin/course/${courseId}`, {
                title,
                description,
                price,
                imageLink,
                published:true
               },{
               headers: {
                 "Content-type": "application/json",
                 "Authorization": "Bearer " + localStorage.getItem("token")
               }
             })

             const data = response.data
             props.setCourse(data)

            }catch(error){
              console.log("fetching error",error)
            }

          }

            update()     
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
   variant='outlined' style={{ margin: 10,
    width: 350,
    minHeight: 200,
    borderRadius: 20,
    marginRight: 50,
    marginTop:50,
    paddingBottom: 15,
    zIndex: 2}}>
  <Typography textAlign={"center"} variant={"h6"} fontFamily={"Arial"} fontWeight={"bold"}>{course.title}</Typography>
  <br />
  <br />
  <Typography textAlign={"center"} variant={"subtitle1"} fontFamily={"Arial"} fontWeight={"bold"}>{course.description}</Typography>
  <img src={course.imageLink} alt="Course Image" style={{ width: 400, height: 225 }} />
  <div style={{marginRight:10}}>
          <Typography  fontFamily={"Arial"} fontSize={14}>Price</Typography>
          <Typography  fontFamily={"Arial"} fontSize={20} fontWeight={"Bold"}>${course.price}</Typography>
        </div>
</Card>

    </div>
    
    

  )
}



function GrayTopper(props) {
  const title = props.course.title
  return <div style={{height: 250, background: "#212121", top: 0, width: "100%", zIndex: 0, marginBottom: -250,marginRight:-10}}>
      <div style={{ height: 250, display: "flex", justifyContent: "center", flexDirection: "column"}}>
          <div>
              <Typography style={{color: "white", fontWeight: 600}} variant="h3" textAlign={"center"}>
                  {title}
              </Typography>
          </div>
      </div>
  </div>
}

export default Course;

