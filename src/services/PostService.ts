import { CreatePostRequest } from "../interfaces/create-post-request.interface";
import { Post } from "../interfaces/post.interface";
import axios from "axios";

class PostService {
  private readonly baseUrl: string;
  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || "";
  }

  // Fetch a list of posts
  async getPosts(): Promise<Post[]> {
    try {
      const response = await fetch(`${this.baseUrl}/api/post`);
      const data = response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }

  // Create a new post
  async createPost(post: CreatePostRequest) {
    try {
      const response = await axios.post(`${this.baseUrl}/api/post`, post, {
        // headers: {
        // 'Content-Type': 'multipart/form-data; boundary=something',
        // "Access-Control-Allow-Origin": "*"
        // }
      });
      return response;
      // const response = await fetch(`${this.baseUrl}/api/post`, {
      //   method: "POST",
      //   body: post,
      // })
      // const data = response.json();
      // return data;
    } catch (error) {
      throw error;
    }
  }

  // // Update an existing post
  async updatePostCaption(postId: number, updatedCaption: string) {
    try {
      const response = await fetch(`${this.baseUrl}/api/posts/${postId}`, {
        method: "PUT",
        body: JSON.stringify({ caption: updatedCaption }),
      });
      const data = response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }

  // // Delete a post by ID
  // async deletePost(postId) {
  //   try {
  //     const response = await this.axios.delete(`/posts/${postId}`);
  //     return response.data;
  //   } catch (error) {
  //     throw error;
  //   }
  // }
}

const postService = new PostService();
export default  postService;
