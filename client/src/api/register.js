import axios from "axios";

const handleRegisterSubmit = async (data, setSnackbarParams,navigate) => {
  const serverUrl = import.meta.env.VITE_SERVER_URL;
   
  try {
    const response = await axios.post(`${serverUrl}/api/register`, data);
    if (response.status === 201) {
      setSnackbarParams({ message: response.data.message, open: true, color: "success" });
      navigate("/login");
    }
  } catch (error) {
    if (error.response?.status === 409) {
      setSnackbarParams({ message: "This user already exists!", open: true, color: "warning" });
    } else {
      setSnackbarParams({ message: "The registration process failed! Please try again", open: true, color: "warning" });
    }
  }
};

  export default handleRegisterSubmit;