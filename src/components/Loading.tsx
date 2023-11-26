import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Box, Grid } from "@mui/material";

function Loading() {
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ height: "80vh" }} // Adjust as needed
    >
      <Grid item>
        <CircularProgress color="success" />
      </Grid>
    </Grid>
  );
}

export default Loading;
