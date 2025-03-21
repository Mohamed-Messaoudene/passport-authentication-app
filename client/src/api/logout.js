import axios from 'axios';

const handleLogout = async (navigate,setSnackbarParams) => {
  const serverUrl = import.meta.env.VITE_SERVER_URL||'http://localhost:5000';
  try {
    const response = await axios.get(`${serverUrl}/api/logout`,{ withCredentials: true });

    if (response.status === 200) {
      setSnackbarParams({
        message:"logout successfully",
        open: true,
        color: "success",
      });
      navigate("/");
    }
  } catch (error) {
    setSnackbarParams({
      message: (error.response && error.response.data && error.response.data.message)||"logout failed",
      open: true,
      color: "warning",
    });
  }
};
export default handleLogout;