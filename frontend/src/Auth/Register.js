import React from "react";
import { Box, Button, TextField } from "@mui/material";

const SignIn = () => {
  return (
    <>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          p: 3,
          width: "300px",
          mx: "auto",
          boxShadow: 3,
          borderRadius: 2,
          marginTop: "200px",
          marginBottom: "100px",
        }}
        noValidate
        autoComplete="off"
        className="login"
      >
        <Box className="header_title">Registration </Box>

        <Box  style ={{marginTop:"20px"}}className="Registration">
          
        <TextField
        style={{marginTop:"10px"}}
            type="text"
           
            required
            id="Username"
            variant="standard"
            label="Enter Username"
          />
          <TextField
          style={{marginTop:"10px"}}
            type="email"
            required
            id="email"
            variant="standard"
            label="Enter Email Id"
          />

          <TextField
          style={{marginTop:"10px"}}
            type="password"
            required
            id="password"
            variant="standard"
            label="Enter Password"
          />

         

          <Button style={{marginTop:"20px"}} className="primary_button">

            Register
          </Button>

         
        </Box>
      </Box>
    </>
  );
};

export default SignIn;
