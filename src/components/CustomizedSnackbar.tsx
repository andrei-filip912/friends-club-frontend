import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
interface CustomizedSnackbarProps {
  snackBarOpen: boolean;
  setSnackbarOpen: (value: boolean) => void;
}
export default function CustomizedSnackbar({snackBarOpen, setSnackbarOpen}: CustomizedSnackbarProps) {
 
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };

  return (
    // <Stack spacing={2} sx={{ width: '100%' }}>
    //   <Button variant="outlined" onClick={handleClick}>
    //     Open success snackbar
    //   </Button>
    <Snackbar open={snackBarOpen} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
        Post created successfully!
      </Alert>
    </Snackbar>
    // </Stack>
  );
}
