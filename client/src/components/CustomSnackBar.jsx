import { Alert, Snackbar } from "@mui/material";
import { useSnackbarContext } from "../assets/Mycontext";

function CustomSnackBar() {
  const {snackbarParams,setSnackbarParams} = useSnackbarContext();
  const {message,open,color} = snackbarParams;
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarParams((prevParams) => ({ ...prevParams, open: false }));
  };
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      anchorOrigin={{ vertical: "top", horizontal: "center" }} // Controls position on screen
      onClose={handleClose}
    >
      <Alert severity={color} variant="filled" sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}

export default CustomSnackBar;
