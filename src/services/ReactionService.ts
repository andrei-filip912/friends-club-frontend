import { CreateReactionRequest } from "@/interfaces/reaction/create-reaction-request";
import { GetReactionRequest } from "@/interfaces/reaction/get-reaction-request.interface";
import { Reaction } from "@/interfaces/reaction/reaction.interface";
import { AxiosInstance } from "axios";

class ReactionService {
  private readonly client: AxiosInstance;
  constructor(client: AxiosInstance) {
    this.client = client;
  }

  async getReaction(getReactionRequest: GetReactionRequest, accessToken?: string): Promise<Reaction[]> {
    try {
      const response = await this.client.get("/api/", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const { data } = response;
      return data;
    } catch (error) {
      throw error;
    }
  }

  async createReaction(reaction: CreateReactionRequest,  accessToken?: string){
    try {
      const response = await this.client.post("/api/reaction", reaction,
       {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export default ReactionService;