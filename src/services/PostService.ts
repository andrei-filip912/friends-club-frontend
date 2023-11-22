import { UpdatePostCaptionRequest } from "@/interfaces/update-post-caption-request.interface";
import { CreatePostRequest } from "../interfaces/create-post-request.interface";
import { Post } from "../interfaces/post.interface";
import axios from "axios";

class PostService {
  private readonly baseUrl: string;
  constructor() {
    this.baseUrl = process.env.API_URL || "";
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
      const response = await axios.post(`${this.baseUrl}/api/post`, post);
      return response;

    } catch (error) {
      throw error;
    }
  }

  // // Update an existing post
  async updatePostCaption(postId: number, updateCaptionRequest: UpdatePostCaptionRequest) {
    try {
      const response = await axios.patch(`${this.baseUrl}/api/post/${postId}/caption`, updateCaptionRequest);
      return response;
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
