import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import PostCard from "./PostCard";
import { Post } from "@/interfaces/post.interface";

interface PostListProps {
  posts: Post[];
  accessToken?: string;
}

const PostList: React.FC<PostListProps> = ({ posts, accessToken }) => {
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
            <PostCard post={post} accessToken={accessToken} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default PostList;
