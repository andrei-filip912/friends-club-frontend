import { Button, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { setIsAddOpen } from "../../redux/features/post-slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import AddEditPostDialog from "./AddEditPostDialog";

const PostInput = () => {
  const [isAddOpen, setAddOpen] = useState(false);

  return (
    <div>
      <Grid container justifyContent="center">
        <Grid
          container
          item
          direction="row"
          justifyContent="center"
          alignItems="center"
          columnSpacing={1}
          marginBottom={2}
          lg={7}
          md={6}
          xs={5}
        >
          <Grid item xs={10}>
            <TextField
              onClick={() => setAddOpen(true)}
              fullWidth
              multiline
              placeholder={"What is on your mind..."}
              maxRows={3}
              //value={caption}
            />
          </Grid>
          <Grid item>
            <Button
              onClick={() => setAddOpen(true)}
              variant="contained"
              sx={{ height: "54px" }}
            >
              <AddPhotoAlternateIcon sx={{ fontSize: 28 }} />
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <AddEditPostDialog open={isAddOpen} setOpen={setAddOpen} />
    </div>
  );
};

export default PostInput;
