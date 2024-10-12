import axios from 'axios';

const handleLogout = async (navigate,setSnackbarParams) => {
  const serverUrl = import.meta.env.VITE_SERVER_URL;
  try {
    const response = await axios.get(`${serverUrl}/api/logout`,{ withCredentials: true });

    if (response.status === 200) {
      console.log('Logged out successfully');
      setSnackbarParams({
        message:"logout successfully",
        open: true,
        color: "success",
      });
      navigate("/");
    }
  } catch (error) {
    console.error('An error occurred:', error);
    setSnackbarParams({
      message: (error.response && error.response.data && error.response.data.message)||"logout failed",
      open: true,
      color: "warning",
    });
  }
};
export default handleLogout;