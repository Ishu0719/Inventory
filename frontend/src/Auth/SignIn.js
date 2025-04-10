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
        <Box className="header_title">Login</Box>

        <Box className="signIn">
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

          <Box className="forgot_password">
            <Box className="forgot">Forgot Password?</Box>
          </Box>

          <Button className="primary_button">Login</Button>

          <Box className="account">
            <Box>create your account</Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SignIn;
