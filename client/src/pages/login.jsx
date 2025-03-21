import {
  Box,
  TextField,
  Button,
  Typography,
  Divider,
  Tooltip,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { blueGrey } from "@mui/material/colors";
import { Login, Google, Facebook, GitHub } from "@mui/icons-material";
import SignWithButton from "../components/SignWithButton";
import SideImage from "../components/SideImage";
import Header from "../components/header";
import { Link, useNavigate } from "react-router-dom";
import handleLoginSubmit from "../api/login";
import { useForm } from "react-hook-form";
import { useSnackbarContext } from "../assets/Mycontext";

function LoginPage() {
  const theme = useTheme(); // Access the theme
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();
  const { setSnackbarParams } = useSnackbarContext();
  const navigate = useNavigate();
  const SERVER_URL = import.meta.env.VITE_SERVER_URL;
  const handleGoogleSignIn = () => {
    window.open(`${SERVER_URL}/api/signWithGoogle`, "_self");
  };
  const handleFacebookSignIn = () => {
    window.open(`${SERVER_URL}/api/signWithFacebook`, "_self");
  };
  const handleGithubSignIn = () => {
    window.open(`${SERVER_URL}/api/signWithGithub`, "_self");
  };

  return (
    <>
      <Header title="Login Form" />
      <Box
        className="boxShadow"
        sx={{
          width: "100%",
          height: "62vh",
          backgroundColor: "white",
          display: "flex",
          borderRadius: "8px",
        }}
      >
        <SideImage url="/login-affiliate.webp" alt="log in image" />
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-around"
          alignItems="center"
          color={blueGrey[500]}
          width="50%"
        >
          <Typography variant="h6" color="inherit" mt={2}>
            Members Log In
          </Typography>
          <form
            style={{ width: "100%" }}
            onSubmit={handleSubmit((data) =>
              handleLoginSubmit(data, reset, setSnackbarParams, navigate)
            )}
          >
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="space-around"
              width={"100%"}
            >
              <Tooltip
                title={errors.email ? errors.email.message : ""}
                placement="bottom-start"
                open={Boolean(errors.email)}
                arrow
              >
                <TextField
                  label="Email"
                  variant="standard"
                  name="email"
                  sx={{
                    mb: "20px",
                    width: "70%",
                    "& .MuiInputBase-input": {
                      fontSize: "15px",
                    },
                  }}
                  {...register("email", {
                    required: "Email is required !",
                    pattern: {
                      value:
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: "Invalid email address !",
                    },
                  })}
                />
              </Tooltip>
              <Tooltip
                title={errors.password ? errors.password.message : ""}
                placement="bottom-start"
                open={Boolean(errors.password)}
                arrow
              >
                <TextField
                  label="Password"
                  type="password"
                  variant="standard"
                  name="password"
                  sx={{
                    mb: "20px",
                    width: "70%",
                    "& .MuiInputBase-input": {
                      fontSize: "15px",
                    },
                  }}
                  {...register("password", {
                    required: "please enter a safe password !",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters long !",
                    },
                  })}
                />
              </Tooltip>
              <Button
                type="submit"
                variant="outlined"
                startIcon={<Login />}
                sx={{
                  fontWeight: "bold",
                  color: theme.palette.teal.main,
                  borderColor: theme.palette.teal.main,
                }}
                disabled={isSubmitting}
              >
                Sign in
              </Button>
            </Box>
          </form>

          <Divider sx={{ width: "70%" }}>Or</Divider>
          <SignWithButton
            Icon={Google}
            content={" Sign in with Google"}
            color={"orange"}
            handleOnClick={handleGoogleSignIn}
          />
          <SignWithButton
            Icon={Facebook}
            content={" Sign in with Facebook"}
            color={"blue"}
            handleOnClick={handleFacebookSignIn}
          />
          <SignWithButton
            Icon={GitHub}
            content={" Sign in with Github"}
            color={"black"}
            handleOnClick={handleGithubSignIn}
          />

          <Typography variant="body1" color="inherit">
            New here?{""}
            <Link to="/register" style={{ color: "orange" }}>
              Sign Up
            </Link>
          </Typography>
        </Box>
      </Box>
    </>
  );
}

export default LoginPage;
