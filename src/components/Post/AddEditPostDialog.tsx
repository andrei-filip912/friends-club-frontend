import { Button, Grid, TextField, Typography } from "@mui/material";
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
import postService from "../../services/PostService";

interface FileWithPreview extends File {
  preview: string;
}

type Props = {
  open: boolean;
  setOpen: (val: boolean) => void;
  post?: Post;
};

const AddEditPostDialog = ({ open, setOpen, post }: Props) => {
  const isAdd = post ? false : true;

  const [snackBarOpen, setSnackbarOpen] = useState(false);
  const [snackBarText, setSnackbarText] = useState("");
  // post assets
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [rejectedFiles, setRejectedFiles] = useState<FileRejection[]>([]);
  const [caption, setCaption] = useState<string>("");

  const handleDialogClose = () => {
    setOpen(false);
  };

  const handleSubmitAdd = async () => {
    const formData = new FormData();
    formData.append("image", files[0] as File);
    formData.append("caption", caption);

    const res = await postService.createPost(formData);
    if (res.status === 201) {
      resetPostAssets();
      handleDialogClose();
      setSnackbarText("Post added successfully!");
      setSnackbarOpen(true);
    }
  };

  const handleSubmitEdit = async () => {
    const updatePostCaption = {
      caption: caption
    };
    const res = await postService.updatePostCaption(post!.id, updatePostCaption);
    if (res.status === 200) {
      resetPostAssets();
      handleDialogClose();
      setSnackbarText("Post edited successfully!");
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
          {isAdd ? (
            <Button onClick={handleSubmitAdd} variant="contained" fullWidth>
              <Typography>Post</Typography>
            </Button>
          ) : (
            <Button onClick={handleSubmitEdit} variant="contained" fullWidth>
              <Typography>Save changes</Typography>
            </Button>
          )}
        </DialogActions>
      </Dialog>
      <CustomizedSnackbar
        text={snackBarText}
        snackBarOpen={snackBarOpen}
        setSnackbarOpen={setSnackbarOpen}
      />
    </>
  );
};

export default AddEditPostDialog;
