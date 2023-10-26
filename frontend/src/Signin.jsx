import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import axios from 'axios'


const Signin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);

    if (newPassword.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
    } else {
      setPasswordError('');
    }
  };

  const isSigninButtonDisabled = !username || !password || password.length < 8;

  return (
    <div style={{ padding: 100 }}>
      <center>
        <div>
          <Typography variant="h6" fontFamily="Arial" fontWeight="bold">
            Sign in to get all the Courses
          </Typography>
        </div>
        <Card variant="outlined" style={{ width: 400, padding: 15 }}>
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
          {passwordError && (
            <p style={{ color: 'red', fontSize: '12px' }}>{passwordError}</p>
          )}
          <br />
          <Button
            variant="contained"
            disabled={isSigninButtonDisabled}
            onClick={() => {
              const fetchdata = async()=>{
                try{
                  const res =  await axios.post('http://localhost:3000/admin/login',{},
                  {
                  headers: {
                    "Content-type": "application/json",
                    "username" : username,
                    "password" : password
                  },
                })
                    let data = res.data
                    localStorage.setItem("token",data.token) 
                    // history.push("/Home")
                    window.location = "/home"
                }
                catch(error){
                 console.log("fetching error")
                }
            }
              
            fetchdata();
             }}
          >
            <Typography variant="h6">Sign in</Typography>
          </Button>
        </Card>
      </center>
    </div>
  );
};

export default Signin;
