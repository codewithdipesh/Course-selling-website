import React, { useState } from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import axios from "axios"

const Signup = () => {
 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(''); // New state for the error message
  

  // Function to handle changes in the username field
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  // Function to handle changes in the password field
  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);

    // Check if the password meets the criteria
    if (newPassword.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
    } else {
      setPasswordError('');
    }
  };

  // Function to check if both fields are filled and the password meets the criteria
  const isSignupButtonDisabled = !username || !password || password.length < 8;

 
  return (
     <div style={{padding : 100}}>

        <center>
            <div>
                <Typography varient={"h2"} fontFamily={"Arial"} fontWeight={"bold"}>Welcome to Coursera Sign up now</Typography>
            </div>
        <Card varient="Outlined" style={{width: 400 , padding: 15  }}>
      <TextField
        id="Username"
        helperText="Enter Your Username"
        label="Username"
        variant="outlined"
        value={username}
        onChange={handleUsernameChange}
      />
      <br />
      
      <br />
      <TextField
        id="Password"
        type="password"
        helperText="Enter Password"
        label="Password"
        variant="outlined"
        value={password}
        onChange={handlePasswordChange}
      />
      {passwordError && <p style={{ color: 'red', fontSize: "12px" }}>{passwordError}</p>} {/* Display error message if present */}
      <br />
      <Button
        variant="contained"
        disabled={isSignupButtonDisabled}
        onClick= {()=>{
        
          const fetchdata = async()=>{
            try{
              const res =  await axios.post('http://localhost:3000/admin/signup', {
                username,
                password
              },
              )
                let data = res.data
                localStorage.setItem("token",data.token) 
                // history.push("/Home")
                window.location = "/"
            }
            catch(error){
              console.log("fetching error")
            }
        }
          
        fetchdata();
         }}
      >
       <Typography > Sign Up</Typography>
      </Button>
    </Card>
        </center>
     </div>
   
  );
}

export default Signup;
