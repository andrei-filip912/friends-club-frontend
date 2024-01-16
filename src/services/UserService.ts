import { DeleteUserPostsRequest } from "@/interfaces/delete-user-posts";
import { AxiosInstance } from "axios";

class UserService {
  private readonly client: AxiosInstance;
  constructor(client: AxiosInstance) {
    this.client = client;
  }

  // Delete a post by ID
  async deleteUserPosts(deleteUserPostsRequest: DeleteUserPostsRequest, accessToken?: string) {
    try {
      const userId = deleteUserPostsRequest.userId;
      const response = await this.client.delete(`/api/user/${userId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export default UserService;
