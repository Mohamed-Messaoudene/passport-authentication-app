import axios from "axios";

const fetchProfileData = async ({ setSnackbarParams, navigate, setProfileData }) => {
  try {
    const serverUrl = import.meta.env.VITE_SERVER_URL||'http://localhost:5000';
    console.log("i will fetch the profile info")
    const response = await axios.get(`${serverUrl}/api/profile`, { withCredentials: true });
        
    // Handle profile data if authenticated
    if (response.status === 200) {  
      console.log('this is the response of get profile data : ',response);    
      const content = {
        username: response.data.user.username,
        email: response.data.user.email,
        profilePicture:response.data.user.profilePicture,
      };

      setSnackbarParams({
        message: "Welcome to your profile page",
        open: true,
        color: "success",
      });
      setProfileData(content);
    }
  } catch (error) {    
    if (error.response) {
      // Check if the error indicates an unauthorized access
      console.log("there is an error when fetching data of profile");
      if (error.response.status === 401) {
        setSnackbarParams({
          message: error.response.data.message || "You have to login first!",
          open: true,
          color: "warning",
        });
      }
    } else {
      // Other types of errors (like network errors)
      setSnackbarParams({
        message: "Unexpected error! Please try again",
        open: true,
        color: "warning",
      });
    }
    navigate("/login");

  }
};
export default fetchProfileData;
