import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import PostCard from "./PostCard";
import postService from "../../services/PostService";
import { Post } from "@/interfaces/post.interface";

const PostList = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const posts = await postService.getPosts();
      setPosts(posts);
    };
    fetchData();
  }, []);

  return (
    <Grid
      container
      direction="column"
      justifyContent="flex-start"
      alignItems="center"
      rowSpacing={4}
    >
      {/* ...Posts... */}
      {posts.map((post) => {
        return (
          <Grid item key={post.id} sx={{ width: "50%" }} xs={8}>
            <PostCard post={post} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default PostList;
