import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, useTheme } from "@mui/material";
import Header from "../components/header";
import { Login, AppRegistration } from "@mui/icons-material";

function Home() {
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <>
     
       <Header title=" Authentification system " />
        <Box display="flex" alignItems="center" justifyContent="space-between" width="40%" marginTop="40px">
          <Button
            type="submit"
            variant="outlined"
            startIcon={<Login />}
            sx={{
              fontWeight: "bold",
              color: theme.palette.teal.main,
              borderColor: theme.palette.teal.main,
            }}
            onClick={() => {
              navigate("/login");
            }}
          >
            Log in
          </Button>
          <span>Or</span>
          <Button
            type="submit"
            variant="outlined"
            startIcon={<AppRegistration />}
            sx={{
              fontWeight: "bold",
              color: theme.palette.teal.main,
              borderColor: theme.palette.teal.main,
            }}
            onClick={() => {
              navigate("/register");
            }}
          >
            Sign up
          </Button>
        </Box>
    </>
  );
}

export default Home;
