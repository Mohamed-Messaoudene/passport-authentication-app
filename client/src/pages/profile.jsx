import  { useEffect, useState } from "react";
import Header from "../components/header";
import SideImage from "../components/SideImage";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import { Logout } from "@mui/icons-material";
import DynamicWidthTextField from "../components/DynamicWidthTextField";
import handleLogout from "../api/logout";
import { useLocation, useNavigate } from "react-router-dom";
import { useSnackbarContext } from "../assets/Mycontext";
import fetchProfileData from "../api/fetchProfileData";

function Profile() {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { setSnackbarParams } = useSnackbarContext();
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!location.state) {
        fetchProfileData({ setSnackbarParams, navigate, setProfileData });
      } else {
        setProfileData(location.state);
      }
    };
    fetchData();
  }, [navigate, setSnackbarParams, location.state]);

  if (!profileData) {
    return <div>Loading...</div>;
  }

  const { username = "example_username", email = "example@example.com",profilePicture = "/profile.png" } = profileData;

  return (
    <>
      <Header title={"Profile"} />
      <Box
        className="boxShadow"
        sx={{
          width: "100%",
          height: "60vh",
          backgroundColor: "white",
          display: "flex",
          borderRadius: "8px",
        }}
      >
        <SideImage
          url="/b080-Welcome-Email-Template-small.webp"
          alt="welcome image"
        />
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-around"
          alignItems="center"
          color={blueGrey[500]}
          width="50%"
        >
          <Typography
            variant="subtitle1"
            color="inherit"
            mt={2}
            fontSize={"17px"}
          >
            Welcome{" "}
            <span
              style={{ color: theme.palette.teal.main, fontWeight: "bold" }}
            >
              {username}
            </span>{" "}
            to your profile
          </Typography>
          <Box
            display="flex"
            alignItems="center"
            border="3px solid"
            borderRadius="50%"
            borderColor={theme.palette.teal.main}
            overflow="hidden"
            width="30%"
          >
            <img
              src={profilePicture}
              alt="profile image"
              width="100%"
              style={{ objectFit: "cover" }}
            />
          </Box>
          <Box display="flex" flexDirection="column" alignItems="flex-start">
            <DynamicWidthTextField label="Username" content={username} />
            <DynamicWidthTextField label="Email" content={email} />
          </Box>

          <Button
            type="submit"
            variant="outlined"
            startIcon={<Logout />}
            sx={{
              fontWeight: "bold",
              color: theme.palette.teal.main,
              borderColor: theme.palette.teal.main,
            }}
            onClick={() => handleLogout(navigate, setSnackbarParams)}
          >
            Log Out
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default Profile;
