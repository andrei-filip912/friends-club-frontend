import { CreateReactionRequest } from "@/interfaces/reaction/create-reaction-request";
import { ReactionDto } from "@/interfaces/reaction/reaction.dto";
import buildClient from "@/pages/api/build-client";
import { AppDispatch } from "@/redux/store";
import PostService from "@/services/PostService";
import ReactionService from "@/services/ReactionService";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import * as React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Post } from "../../interfaces/post.interface";
import AlertDialog from "../AlertDialog";
import CustomizedSnackbar from "../CustomizedSnackbar";
import LongMenu from "../LongMenu";
import AddEditPostDialogClient from "./AddEditPostDialog";
import { useUser } from "@auth0/nextjs-auth0/client";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));
type Props = {
  post: Post;
  accessToken?: string;
};

export default function PostCard({ post, accessToken }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useUser();
  const [expanded, setExpanded] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [isDeleteOpen, setIsDeleteOpen] = React.useState(false);
  const [isEditOpen, setIsEditOpen] = React.useState(false);
  const [reaction, setReaction] = React.useState<string>("");
  const [snackBarOpen, setSnackbarOpen] = React.useState(false);
  const [snackBarText, setSnackbarText] = React.useState("");
  const [reactions, setReactions] = React.useState<ReactionDto[]>([]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleOptionsClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDeletePost = async () => {
    // create resquest body
    const deletePostRequest = {
      postId: post.id,
    };
    // build client and service, then send request
    const client = buildClient();
    const postService = new PostService(client);
    const res = await postService.deletePost(deletePostRequest, accessToken);

    // display success message for status 200
    if (res.status === 200) {
      setIsDeleteOpen(false);
      setSnackbarText("Post deleted successfully.");
      setSnackbarOpen(true);
    }
  };

  const handleReactionChange = async (newReaction: string) => {
    // build client and service, then send request
    const client = buildClient();
    const reactionService = new ReactionService(client);

    if (newReaction === reaction) {
      // send request to delte
      setReaction("");

      const deleteReactionRequest = {
        postId: post.id,
      };
      await reactionService.deleteReaction(deleteReactionRequest, accessToken);
    } else {
      setReaction(newReaction);

      const createReactionRequest: CreateReactionRequest = {
        postId: post.id,
        reactionType: newReaction,
      };

      await reactionService.createOrUpdateReaction(
        createReactionRequest,
        accessToken
      );
    }
  };

  useEffect(() => {
    const fetchReactions = async () => {
      // build client and service, then send request
      const client = buildClient();
      const reactionService = new ReactionService(client);
      
      const res = await reactionService.getReactions(post.id, accessToken);
      setReactions(res);
    };

    if (post.id && accessToken) {
      fetchReactions();
    }
  }, [post.id, accessToken]);

  // when user obj and reactions array are available, 
  // display a reaction for the current user, if there is one
  useEffect(() => {
    if (user && reactions.length > 0) {
      reactions.forEach((reaction) => {
        if (reaction.userId === user.sub) {
          setReaction(reaction.reactionType);
        }
      });
    }
  }, [user, reactions]);

  const alertText = {
    title: "Delete the post ?",
    content:
      "Are you sure you want to delete the selected post? The post, including all its content will be deleted forever and cannot be recoverd.",
  };

  return (
    <>
      <Card>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              R
            </Avatar>
          }
          action={
            <IconButton aria-label="settings" onClick={handleOptionsClick}>
              <MoreVertIcon />
            </IconButton>
          }
          title="User name"
          subheader="September 14, 2016"
        />
        <LongMenu
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
          setOpenEditDialog={() => setIsEditOpen(true)}
          setOpenDeleteDialog={() => setIsDeleteOpen(true)}
        />
        {/* !!!!!!!!!!!! use next image */}
        <CardMedia
          component="img"
          height="194"
          image="https://spanishsabores.com/wp-content/uploads/2020/05/Seafood-Paella-1837-Blog.jpg"
          alt="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {post.caption}
          </Typography>
        </CardContent>
        <CardContent>
          <Typography color="text.secondary">
            Reactions: {reactions.length}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            aria-label="like"
            onClick={() => handleReactionChange("like")}
          >
            <ThumbUpIcon color={reaction === "like" ? "primary" : "inherit"} />
          </IconButton>
          <IconButton
            aria-label="dislike"
            onClick={() => handleReactionChange("dislike")}
          >
            <ThumbDownIcon
              color={reaction === "dislike" ? "primary" : "inherit"}
            />
          </IconButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        {/* <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and
            set aside for 10 minutes.
          </Typography>
          <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet
            over medium-high heat. Add chicken, shrimp and chorizo, and cook,
            stirring occasionally until lightly browned, 6 to 8 minutes.
            Transfer shrimp to a large plate and set aside, leaving chicken and
            chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes,
            onion, salt and pepper, and cook, stirring often until thickened and
            fragrant, about 10 minutes. Add saffron broth and remaining 4 1/2
            cups chicken broth; bring to a boil.
          </Typography>
          <Typography paragraph>
            Add rice and stir very gently to distribute. Top with artichokes and
            peppers, and cook without stirring, until most of the liquid is
            absorbed, 15 to 18 minutes. Reduce heat to medium-low, add reserved
            shrimp and mussels, tucking them down into the rice, and cook again
            without stirring, until mussels have opened and rice is just tender,
            5 to 7 minutes more. (Discard any mussels that don&apos;t open.)
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then
            serve.
          </Typography>
        </CardContent>
      </Collapse> */}
      </Card>

      <AddEditPostDialogClient
        open={isEditOpen}
        setOpen={setIsEditOpen}
        post={post}
        accessToken={accessToken}
      />

      <AlertDialog
        {...alertText}
        open={isDeleteOpen}
        setOpen={setIsDeleteOpen}
        agree={handleDeletePost}
      />
      <CustomizedSnackbar
        text={snackBarText}
        snackBarOpen={snackBarOpen}
        setSnackbarOpen={setSnackbarOpen}
      />
    </>
  );
}
