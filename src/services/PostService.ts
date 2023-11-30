import { DeletePostRequest } from "@/interfaces/delete-post-request.interface";
import { UpdatePostCaptionRequest } from "@/interfaces/update-post-caption-request.interface";
import { AxiosInstance } from "axios";
import { CreatePostRequest } from "../interfaces/create-post-request.interface";
import { Post } from "../interfaces/post.interface";

class PostService {
  private readonly client: AxiosInstance;
  constructor(client: AxiosInstance) {
    this.client = client;
  }

  // Fetch a list of posts
  async getPosts(accessToken?: string): Promise<Post[]> {
    try {
      const response = await this.client.get("/api/post", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const { data } = response;
      return data;
    } catch (error) {
      throw error;
    }
  }

  // Create a new post
  async createPost(post: CreatePostRequest, accessToken?: string) {
    try {
      const response = await this.client.post("/api/post", post, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Update an existing post
  async updatePostCaption(
    postId: number,
    updateCaptionRequest: UpdatePostCaptionRequest,
    accessToken?: string
  ) {
    try {
      const response = await this.client.patch(
        `/api/post/${postId}/caption`,
        updateCaptionRequest,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Delete a post by ID
  async deletePost(deletePostRequest: DeletePostRequest, accessToken?: string) {
    try {
      const postId = deletePostRequest.postId;
      const response = await this.client.delete(`/api/post/${postId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default PostService;
