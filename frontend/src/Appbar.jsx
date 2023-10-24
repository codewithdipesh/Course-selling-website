import React, { useState } from "react"
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";



function Appbar() {
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
        <Card style={{display :"flex", justifyContent :"space-between"}} > 
          <div> <Typography style={{fontWeight:"bold",margin:20 ,fontSize:22}} >Coursera</Typography></div>
  
           <div style={{display:"flex"}}>
  
           <div>
                <Typography varient={"h2"} fontFamily={"Arial"} fontWeight={"bold"}>{name}</Typography>
            </div>
         
            <div> 
              <Button   variant="contained" style={{margin : 8}} 
              onClick={()=>{
                localStorage.setItem("token",null);
               window.location = "/login"
              }}>Log Out</Button></div>
         
           </div>
            
        </Card>
       
       
      </>
    )
  }
  
  
else{

  return (
    <>
      <Card style={{display :"flex", justifyContent :"space-between"}} > 
        <div> <Typography style={{fontWeight:"bold",margin:20 ,fontSize:22}} >Coursera</Typography></div>

         <div style={{display:"flex"}}>

          <div>
            <Button   variant="contained" style={{margin : 8}} 
            onClick={()=>{
              navigate("/signup")
            }}>Sign up</Button>
            
          </div>
       
          <div> 
            <Button   variant="contained" style={{margin : 8}} 
            onClick={()=>{
             navigate("/login")
            }}>Sign in</Button></div>
       
         </div>
          
      </Card>
     
     
    </>
  )

}
  
          }
export default Appbar