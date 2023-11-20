import { Button, Grid, TextField } from "@mui/material";
import react, { useEffect, useState, useRef } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import Dropzone from "../DropZone";
import styles from "@/styles/AddEditPostDialog.module.css";
import { FileRejection } from "react-dropzone";
import CustomizedSnackbar from "../CustomizedSnackbar";
import { Post } from "../../interfaces/post.interface";
import { setIsAddOpen } from "../../redux/features/post-slice";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "../../redux/store";
import postService from "../../services/PostService";

interface FileWithPreview extends File {
  preview: string;
}

type Props = {
  post?: Post;
};

const AddEditPostDialog = ({ post }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const open = useAppSelector((state) => state.postReducer.value.isAddOpen);
  const isAdd = post ? false : true;

  const [snackBarOpen, setSnackbarOpen] = useState(false);
  // post assets
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [rejectedFiles, setRejectedFiles] = useState<FileRejection[]>([]);
  const [caption, setCaption] = useState<string>("");

  const handleDialogClose = () => {
    // setOpen(false);
    dispatch(setIsAddOpen(false));
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("image", files[0] as File);
    formData.append("caption", caption);

    const res = await postService.createPost(formData);
    if (res.status === 201) {
      resetPostAssets();
      handleDialogClose();
      setSnackbarOpen(true);
    }
  };

  const resetPostAssets = () => {
    setFiles([]);
    setRejectedFiles([]);
    setCaption("");
  };

  useEffect(() => {
    if (!isAdd) {
      setCaption(post!.caption);
    }
  }, [isAdd, post]);

  return (
    <>
      <Dialog open={open} sx={{ marginTop: "3%" }} fullWidth maxWidth="sm">
        <DialogTitle>{isAdd ? "Create a post" : "Edit a post"}</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleDialogClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            placeholder="What is on your mind..."
            label="Caption"
            type="text"
            fullWidth
            multiline
            maxRows={3}
            variant="standard"
            sx={{ marginTop: "0px" }}
            value={caption}
            onChange={(e) => {
              setCaption(e.target.value);
            }}
          />
          {/* show dropzone only when adding */}
          {isAdd ? (
            <Dropzone
              defaultStyle={styles.createPostDropzoneDefault}
              activatedStyle={styles.createPostDropzoneActivated}
              files={files}
              setFiles={setFiles}
              rejectedFiles={rejectedFiles}
              setRejectedFiles={setRejectedFiles}
            />
          ) : (
            <></>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} variant="contained" fullWidth>
            {isAdd ? "Post" : "Save changes"}
          </Button>
        </DialogActions>
      </Dialog>
      <CustomizedSnackbar
        snackBarOpen={snackBarOpen}
        setSnackbarOpen={setSnackbarOpen}
      />
    </>
  );
};

export default AddEditPostDialog;
