import { CreateReactionRequest } from "@/interfaces/reaction/create-reaction-request";
import { DeleteReactionRequest } from "@/interfaces/reaction/delete-reaction-request";
import { GetReactionRequest } from "@/interfaces/reaction/get-reaction-request.interface";
import { ReactionDto } from "@/interfaces/reaction/reaction.dto";
import { Reaction } from "@/interfaces/reaction/reaction.interface";
import { AxiosInstance } from "axios";

class ReactionService {
  private readonly client: AxiosInstance;
  constructor(client: AxiosInstance) {
    this.client = client;
  }

  async getReactions(
    postId: number,
    accessToken?: string
  ): Promise<ReactionDto[]> {
    try {
      const response = await this.client.get(`/api/reaction?postId=${postId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const { data } = response;
      return data;
    } catch (error) {
      throw error;
    }
  }

  async createReaction(reaction: CreateReactionRequest, accessToken?: string) {
    try {
      const response = await this.client.post("/api/reaction", reaction, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  async createOrUpdateReaction(
    reaction: CreateReactionRequest,
    accessToken?: string
  ) {
    try {
      const response = await this.client.put("/api/reaction", reaction, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  async deleteReaction(reaction: DeleteReactionRequest, accessToken?: string) {
    try {
      const response = await this.client.delete('/api/reaction', {
        data: reaction,
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export default ReactionService;
