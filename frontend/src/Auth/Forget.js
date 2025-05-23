import React from "react";
import { Box, Button, TextField ,Grid} from "@mui/material";


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
          marginTop: "200px",
          marginBottom: "100px",
        }}
        noValidate
        autoComplete="off"
        className="login"
      >
        <Box style={{margin:"20px"}} className="header_title">Forget Password</Box>

        <Box className="Forget">
          <Grid>
          <TextField
          style={{marginTop:"10px"}}
            type=" New password"
            required
            id="password"
            variant="standard"
            label="New Password"
         
          />
         
          </Grid>
         
          <TextField
          style={{marginTop:"10px"}}
            type=" Confirm password"
            required
            id="password"
            variant="standard"
            label="Confirm Password"
          />
          

          
          <Button  style={{marginTop:"20px"}}className="primary_button">Password Changed</Button>
        </Box>
      </Box>
    </>
  );
};

export default Forget;
