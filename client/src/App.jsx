import Container from "@mui/material/Container";
import "./app.css";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Login from "../pages/login";
import Register from "../pages/register";
import Home from "../pages/home";
import theme from "./assets/theme";
import Profile from "../pages/profile";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CustomSnackBar from "../components/CustomSnackBar";
import {useState } from "react";
import {myContext} from "./assets/Mycontext";

function App() {
  const [snackbarParams, setSnackbarParams] = useState({
    message: "mohamed messaoudene",
    open: false,
    color: "warning",
  });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <myContext.Provider value={{ snackbarParams, setSnackbarParams }}>
        <Box
          sx={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Container
            maxWidth="md"
            sx={{
              width: "70vw",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "10px",
            }}
          >
            <Router>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Routes>
            </Router>
          </Container>
        </Box>
        <CustomSnackBar
          snackbarParams={snackbarParams}
          setSnackbarParams={setSnackbarParams}
        />
      </myContext.Provider>
    </ThemeProvider>
  );
}

export default App;
