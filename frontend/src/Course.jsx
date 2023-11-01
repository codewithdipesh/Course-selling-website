import React, { useState, useEffect } from 'react';
import {Card,Typography,Button,TextField,Grid} from '@mui/material'
import { useParams } from "react-router-dom";
import axios from "axios"
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { courseDescription, courseImage, coursePrice, courseTitle, isCourseloading } from './Store/selectors/course';
import { courseState } from './Store/atoms/course';


function Course() {
  const { courseId } = useParams();
  const courseLoading = useRecoilValue(isCourseloading)
  const Setcourse = useSetRecoilState(courseState);

  useEffect(() => {
      async function fetchCourse() {
          try {
              const response = await axios.get(`http://localhost:3000/admin/course/${courseId}`, {
                  headers: {
                      'Content-Type': 'application/json',
                      "Authorization": "Bearer " + localStorage.getItem("token")
                  }
              });
              const data = response.data;

              if(data){
                console.log(data.course.title)
                Setcourse({
                  course:{
                    title:data.course.title,
                    description:data.course.description,
                    price:data.course.price,
                    imageLink:data.course.imageLink
                  },
                  isLoading:false
                })
              }else{
                Setcourse({
                  course:null,
                  isLoading:false
                })
              }
              
             
          } catch (error) {
            console.log("fetching error")
           
          } 
      }

      fetchCourse();
  }, []);

  if (courseLoading) {
      return (
          <div style={{paddingTop:300}}>
              <Typography textAlign={"center"} variant={"subtitle1"} fontFamily={"Arial"} fontWeight={"bold"}>Loading......</Typography>
          </div>
      );
  }

 

  return (<>
  <GrayTopper/>

    <Grid container>
      <Grid item sm={12} md={12} lg={8}>
          <UpdatedCard />

       </Grid>
          
     <Grid item sm={12} md={12} lg={4}>
     <CourseCard/>
      </Grid>
    </Grid>
     
      </>
  );
}





function UpdatedCard() {
  const { courseId } = useParams();
  const [Details,SetCourse] = useRecoilState(courseState)
  const[title,settitle] = useState(Details.course.title)
  const[description,setdescription] = useState(Details.course.description)
  const[price,setprice] = useState(Details.course.price)
  const[imageLink,setImage] = useState(Details.course.imageLink)
  
  

  return (
    <>  <div style={{display:"flex",justifyContent:"center"}}>
      
      <Card  variant='outlined'  style={{width:"80%",padding:15 ,maxWidth: 600, marginTop: 200,borderRadius:30}}> 
         
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
               await axios.put(`http://localhost:3000/admin/course/${courseId}`, {
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

             SetCourse({
              course:{
                _id:Details.course._id,
                title:title,
                description:description,
                imageLink:imageLink,
                price:price
              },
              isLoading:false

             })
            

            }catch(error){
            
             console.log("fetching error update time",error)
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




function CourseCard(){
   
  const description = useRecoilValue(courseDescription)
  const Image = useRecoilValue(courseImage)
  const Price = useRecoilValue(coursePrice)
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
      
   <img src={Image} alt="Course Image" style={{ width: 400, height: 225 }} />
  <br />
  <br />
  <Typography textAlign={"center"} variant={"subtitle1"} fontFamily={"Arial"} fontWeight={"bold"}>{description}</Typography>
 
  <div style={{marginRight:10}}>
          <Typography  fontFamily={"Arial"} fontSize={14}>Price</Typography>
          <Typography  fontFamily={"Arial"} fontSize={20} fontWeight={"Bold"}>${Price}</Typography>
        </div>
</Card>

    </div>
    
    

  )
}



function GrayTopper() {
  const title = useRecoilValue(courseTitle)
  console.log(title)
 
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

