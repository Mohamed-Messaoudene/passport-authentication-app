import axios from "axios";

const handleLoginSubmit = async (data, reset, setSnackbarParams, navigate) => {
  const serverUrl = import.meta.env.VITE_SERVER_URL;
  try {
    const response = await axios.post(
      `${serverUrl}/api/login`,
      JSON.stringify(data),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      // Redirect to another page or handle login success
      setSnackbarParams({
        message: "You have login successful",
        open: true,
        color: "success",
      });
      const content = {
        username: response.data.user.username,
        email: response.data.user.email,
      };
      console.log(content)
      navigate("/profile", { state: content });
    }
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      if (status === 401) {
        // Invalid credentials
        setSnackbarParams({
          message: data.message || "Invalid credentials. Please try again.",
          open: true,
          color: "warning",
        });
      } else if (status === 500) {
        // Server-side error
        setSnackbarParams({
          message: data.message || "Server error. Please try again later.",
          open: true,
          color: "warning",
        });
      } else {
        // Other errors
        setSnackbarParams({
          message: data.message || "An unknown error occurred.",
          open: true,
          color: "warning",
        });
      }
    }
  }
};
export default handleLoginSubmit;
