import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import { Grid } from "@mui/material";
import { useRecoilValue } from "recoil";
import { userEmailState } from "./Store/selectors/userEmail";
import { isUserLoading } from "./Store/selectors/isUserLoading";

 const theme1 = createTheme({
  palette: {
    primary: {
      main: '#1b0f93',
      // light: will be calculated from palette.primary.main,
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
   
  },
});
 const theme2 = createTheme({
  palette: {
    primary: {
      main: '#4145e1',
      // light: will be calculated from palette.primary.main,
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
   
  },
});

function Landing() {
  const navigate = useNavigate();
  const userEmail = useRecoilValue(userEmailState)
  const Loading = useRecoilValue(isUserLoading)


  if (Loading) {
    return (
      <div style={{ paddingTop: 300 }}>
        <Typography textAlign={"center"} variant={"subtitle1"} fontFamily={"Arial"} fontWeight={"bold"}>
          Loading......
        </Typography>
      </div>
    );
  }

    return(
      <>  <div>
        <Grid container style={{padding:"5vw"}}>
        <Grid item xs="12" md="12" lg="6">
        <div style={{marginTop:100}}>
          <Typography style={{fontFamily:"sans-serif", fontWeight:"bold", fontSize:"3vw"}}>Come <span style={{color:"#013c8a"}}>Teach</span> With <span style={{color:"#013c8a"}}>Us</span></Typography>
          <Typography style={{fontFamily:"sans-serif", fontSize:"1.8vw" }}>Become an instructor and Share <span style={{display:"block"}}> your knolwedge</span></Typography>
         <br/>
        {!Loading && userEmail && <UserFound navigate={navigate}/>}
        {!Loading &&!userEmail && <Login navigate={navigate} />}
        </div>
        </Grid>

        <Grid item xs="12" md="12" lg="6">
        <div style={{marginTop:30}}>
        <img src="https://img.freepik.com/free-vector/brain-with-digital-circuit-programmer-with-laptop-machine-learning-artificial-intelligence-digital-brain-artificial-thinking-process-concept-vector-isolated-illustration_335657-2246.jpg?w=1060&t=st=1698421492~exp=1698422092~hmac=e1efbd5445f2d3e346e1d769f5e067944c5d18a1136c824845ec3f0fc893f8b8" 
            width={"100%"}/>
        </div>
        </Grid>
        
        </Grid>
          </div>
          
        
      </>
    )
      
  
}

function UserFound({navigate}){

  return (
    <>
      <div style={{display:"flex",justifyContent:"flex-start"}}>
        <div>
        <ThemeProvider theme={theme1}>
          <Button variant="contained" size="large" onClick={()=>{
            navigate("/courses")
          }} >
             <Typography varient={"h2"} fontFamily={"Arial"} fontWeight={"bold"}>
            Explore Courses
             </Typography>
          </Button>
        </ThemeProvider>
        </div>
      </div>
    </>
  );

}

function Login({navigate}){
  return (
    <>
      <div>
        <ThemeProvider theme={theme2}>
          <Button variant="contained" size="large" onClick={()=>{
            navigate("/login")
          }} >
             <Typography varient={"h2"} fontFamily={"Arial"} fontWeight={"bold"}>
             Getting Started
             </Typography>
          </Button>
        </ThemeProvider>
        
      </div>
    </>
  );
}




export default Landing;
