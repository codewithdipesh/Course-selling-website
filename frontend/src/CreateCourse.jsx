import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import { TextField } from '@mui/material';
function CreateCourse() {

  const[title,settitle] = useState("")
  const[description,setdescription] = useState("")
  const[price,setprice] = useState(0)
  const[imageLink,setImage] = useState("")
  

  return (
    <>  <div style={{display:"flex",justifyContent:"center"}}>
      
      <Card  variant='outlined' style={{width:400,padding:15 ,margin:10}}> 
         
      <div style={{display:"flex",justifyContent:"center"}}>
         <Typography varient={"h2"} fontFamily={"Arial"} fontWeight={"bold"}>Add New Courses</Typography>
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
            alert("course added!")
        }    
            
         function call1(res){
            res.json().then(call2)
         }

            fetch('http://localhost:3000/admin/courses', {
            method: "POST",
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
       Add Course
      </Button>
      </div> 

          
     </Card>


    </div>
    
     
     
    </>
  )
}

export default CreateCourse