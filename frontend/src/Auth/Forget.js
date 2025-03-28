import React from "react";
import { Box, Button, TextField } from "@mui/material";

const Forget = () => {
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
        }}
        noValidate
        autoComplete="off"
        className="login"
      >
        <Box className="header_title">Forget Password</Box>

        <Box className="Forget">
          <TextField
            type=" New password"
            required
            id="password"
            variant="standard"
            label="New Password"
          />
          <TextField
            type=" Confirm password"
            required
            id="password"
            variant="standard"
            label="Confirm Password"
          />

          <Box className="Log in">
            <Box className="forgety">Sign -in </Box>
          </Box>

          <Button className="primary_button">Password Changed</Button>
        </Box>
      </Box>
    </>
  );
};

export default Forget;
