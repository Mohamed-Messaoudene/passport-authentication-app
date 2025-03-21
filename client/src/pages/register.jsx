import {
  Box,
  Button,
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import Header from "../components/header";
import SideImage from "../components/SideImage";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import handleRegisterSubmit from "../api/register";
import { useSnackbarContext } from "../assets/Mycontext";

function Register() {
  const theme = useTheme(); // Access the theme
  const {
    register,
    handleSubmit,
    formState: { errors ,isSubmitting},
  } = useForm();
  const {setSnackbarParams} = useSnackbarContext();
  const navigate = useNavigate();

  return (
    <>
      <Header title="Sign Up Form" />
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
        <SideImage url="/signup.png" alt="sign up image" />
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-around"
          alignItems="center"
          color={blueGrey[500]}
          width="50%"
        >
          <Typography variant="h6" color="inherit" mt={2}>
            Create Account
          </Typography>
          <form
            style={{ width: "100%" }}
            onSubmit={handleSubmit((data)=>handleRegisterSubmit(data,setSnackbarParams,navigate))}
          >
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="space-around"
              width={"100%"}
            >
              <Tooltip
                title={errors.username ? errors.username.message : ""}
                placement="bottom-start"
                open={Boolean(errors.username)}
                arrow
              >
              <TextField
                label="Username"
                variant="standard"
                name="username"
                sx={{
                  mb: "20px",
                  width: "70%",
                  "& .MuiInputBase-input": {
                    fontSize: "15px",
                  },
                }}
                {...register("username", {
                  required: " username is required!",
                })}
              />
              </Tooltip>
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
                sx={{
                  fontWeight: "bold",
                  color: theme.palette.teal.main,
                  borderColor: theme.palette.teal.main,
                }}
                disabled={isSubmitting}
              >
                Sign up
              </Button>
            </Box>
          </form>
          <Typography variant="body1" color="inherit">
            Already Have Account?{" "}
            <Link to="/login" style={{ color: "orange" }}>
              Log in
            </Link>
          </Typography>
        </Box>
      </Box>
    </>
  );
}

export default Register;
