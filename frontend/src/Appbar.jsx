import {Typography} from "@mui/material";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

import {useSetRecoilState, useRecoilValue} from "recoil";
import { userState } from "./Store/atoms/user.js";
import { userEmailState } from "./Store/selectors/userEmail"
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import { isUserLoading } from "./Store/selectors/isUserLoading";




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
  const userEmail = useRecoilValue(userEmailState);
  const userLoading = useRecoilValue(isUserLoading)
  const setUser = useSetRecoilState(userState)
  
  if(userLoading){
    return <></>
  }
 
  if(userEmail){
     return (
     
         <div style={{ display: "flex", justifyContent: "space-between",backgroundColor:"#bbcffd",marginTop:-10,marginRight:-10,marginLeft:-10}}>
         <div style={{marginLeft: 10, cursor: "pointer"}} onClick={() => {
                navigate("/")
            }}>
                <Typography variant={"h6"} style={{fontFamily:"Arial",fontWeight:"bold",margin:20,fontSize:25}}>Coursera</Typography>
            </div>
        <div style={{ display: "flex" }}>
      
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
            localStorage.setItem("token",null)
              setUser({  
                isLoading:false,
                userEmail:null
              })
          }} >
             <Typography varient={"h2"} fontFamily={"Arial"} fontWeight={"bold"}>
           Log Out
             </Typography>
          </Button>
        </ThemeProvider>
</div>
        </div>
      </div>
      
      
    )

  }
  else{
    return (
     
      <div style={{ display: "flex", justifyContent: "space-between",backgroundColor:"#bbcffd",marginTop:-10,marginRight:-10,marginLeft:-10}}>
      <div style={{marginLeft: 10, cursor: "pointer"}} onClick={() => {
             navigate("/")
         }}>
             <Typography variant={"h6"} style={{fontFamily:"Arial",fontWeight:"bold",margin:20,fontSize:25}}>Coursera</Typography>
         </div>
     <div style={{ display: "flex" }}>
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
     </div>
   </div>
   
   
 )
  }
   
  
}



export default Appbar;
