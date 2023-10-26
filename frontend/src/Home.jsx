import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Home() {
  const navigate = useNavigate();
  const [name, setName] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/admin/me", {
          headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + localStorage.getItem("token")
          }
        });

        const data = response.data;
        setName(data.username);
        setLoading(false);
      } catch (error) {
        // Handle errors here
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div style={{ paddingTop: 300 }}>
        <Typography textAlign={"center"} variant={"subtitle1"} fontFamily={"Arial"} fontWeight={"bold"}>
          Loading......
        </Typography>
      </div>
    );
  }

  if (name) {
    return (
      <>
        <div>
          <div>
            <Button variant="text" onClick={() => {
              navigate('/courses');
            }}>
              <Typography style={{ fontFamily: "Arial", fontWeight: "bold", margin: 20, fontSize: 15, color: "#171717" }}>
                All Courses
              </Typography>
            </Button>
          </div>

          <div>
            <Button variant="text" onClick={() => {
              navigate('/addcourse');
            }}>
              <Typography style={{ fontFamily: "Arial", fontWeight: "bold", margin: 20, fontSize: 15, color: "#171717" }}>
                Add Course
              </Typography>
            </Button>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div>
          <Typography varient={"h2"} fontFamily={"Arial"} fontWeight={"bold"}>
            Login To see All the Courses
          </Typography>
        </div>
      </>
    );
  }
}

export default Home;
