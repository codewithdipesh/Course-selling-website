import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import axios from "axios";



const theme = createTheme({
  palette: {
    primary: {
      main: '#1b0f93',
      // light: will be calculated from palette.primary.main,
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
   
  },
});




function Appbar() {
  const navigate = useNavigate();
  const [name, setName] = useState(null);

  const init = async () => {
    try {
      const response = await axios.get("http://localhost:3000/admin/me", {
        headers: {
          'Content-Type': 'application/json',
          "Authorization": "Bearer " + localStorage.getItem("token")
        }
      });

      if (response.data.username) {
        setName(response.data.username);
      }
    } catch (error) {
      console.log("fetching error", error);
    }
  }

  useEffect(() => {
    init();
  }, []);

  
 
    return (
     
         <div style={{ display: "flex", justifyContent: "space-between",backgroundColor:"#bbcffd",marginTop:-10,marginRight:-10,marginLeft:-10}}>
         <div style={{marginLeft: 10, cursor: "pointer"}} onClick={() => {
                navigate("/")
            }}>
                <Typography variant={"h6"} style={{fontFamily:"Arial",fontWeight:"bold",margin:20,fontSize:25}}>Coursera</Typography>
            </div>
        <div style={{ display: "flex" }}>
       {  name && <Loggedin name={name} navigate={navigate}/> }
        { !name && <Loggedout navigate={navigate}/>}
        </div>
      </div>
      
      
    )
  
}

function Loggedout({navigate}){
  return(
    <>
    <div>
            <Button variant="contained" style={{ margin: 8 }} onClick={() => {
              navigate("/signup");
            }}>
              Sign up
            </Button>
          </div>
          <div>
            <Button variant="contained" style={{ margin: 8 }} onClick={() => {
              navigate("/login");
            }}>
              Sign in
            </Button>
          </div>

    </>
  )
}
function Loggedin({name,navigate}){
  return (<>

<div>
<div style={{marginLeft: 10, cursor: "pointer"}} onClick={() => {
                navigate("/courses")
            }}>
                <Typography style={{fontFamily:"sans-serif",fontWeight:"bold",margin:20,fontSize:17}}>All Courses</Typography>
            </div>
</div>
<div>
<div style={{marginLeft: 10, cursor: "pointer"}} onClick={() => {
                navigate("/addcourse")
            }}>
                <Typography style={{fontFamily:"sans-serif",fontWeight:"bold",margin:20,fontSize:17}}>Add Course</Typography>
            </div>
</div>
<div>
<div style={{marginLeft: 10, cursor: "pointer"}} onClick={() => {
                navigate("/")
            }}>
                <Typography  style={{fontFamily:"sans-serif",fontWeight:"bold",margin:20,fontSize:17}}>Profile</Typography>
            </div>
</div>
<div>
  <ThemeProvider theme={theme}>
          <Button variant="contained" size="medium" style={{marginTop:15,marginRight:10}} onClick={()=>{
              localStorage.setItem("token", null);
              window.location = "/login";
          }} >
             <Typography varient={"h2"} fontFamily={"Arial"} fontWeight={"bold"}>
           Log Out
             </Typography>
          </Button>
        </ThemeProvider>
</div>
  </>)
}

export default Appbar;
