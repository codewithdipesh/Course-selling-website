import React, { useState } from "react"
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";


function Home() {
  const navigate = useNavigate()
  const[name,setName] = useState(null)
  useEffect(()=>{ //note this 

    function call2(data){
      setName(data.username) 
    }   
      
   function call1(res){
      res.json().then(call2)
   }
      fetch("http://localhost:3000/admin/me",{
        method :"GET",
        headers:{
          'Content-Type': 'application/json',
          "Authorization":"Bearer " + localStorage.getItem("token")
        }
      }).then(call1)
  },[])
    

  if(name){
    return (
      <>
        
        <div >

          <div>
            <Button   variant="text"  
            onClick={()=>{
              navigate('/courses')
            }}><Typography  style={{fontFamily: "Arial"  ,fontWeight:"bold",margin:20 ,fontSize:15, color:"#171717"}} >All Courses</Typography></Button>
            
          </div>
       
          <div> 
            <Button   variant="text" 
            onClick={()=>{
            navigate('/addcourse')
            }}><Typography  style={{fontFamily: "Arial"  ,fontWeight:"bold",margin:20 ,fontSize:15, color:"#171717"}} >Add Course</Typography></Button></div>
       
         </div>
       
      </>
    )
  }
  
  
else{
  return (
    <>
      
       <div>
       <Typography varient={"h2"} fontFamily={"Arial"} fontWeight={"bold"}>Login To see All the Courses</Typography>
       </div>
     
    </>
  )

}

          }
export default Home