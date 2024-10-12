import axios from "axios";

const SignWithGoogle = async ( setSnackbarParams, navigate) => {
  const serverUrl = import.meta.env.VITE_SERVER_URL;
  try {
    const response = await axios.get(
      `${serverUrl}/api/signWithGoogle`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response);
    if (response.status === 200) {
      setSnackbarParams({
        message: "You have login successful",
        open: true,
        color: "success",
      });
      console.log(response);
      const content = {
        username: response.data.user.username,
        email: response.data.user.email,
      };
      console.log(content)
      navigate("/profile", { state: content });
    }
  } catch (error) {
    console.log(error);
    if (error.response) {
      const { status, data } = error.response;
      if (status === 401) {
        setSnackbarParams({
          message: "signing with google failed, please try again !",
          open: true,
          color: "warning",
        });
        navigate("/login");
      } else {
        // Other errors
        setSnackbarParams({
          message:  "An expected error occurred.",
          open: true,
          color: "warning",
        });
        navigate("/login");
      }
    }
  }

};
export default SignWithGoogle;
