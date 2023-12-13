import axios, { AxiosInstance } from "axios";
import { GetServerSidePropsContext } from "next";

const buildClient = (ctx?: GetServerSidePropsContext): AxiosInstance => {
  if (ctx && ctx.req) {
    // request will be sent from server
    return axios.create({
      baseURL:
        process.env.API_SERVER_URL,
      headers: ctx.req.headers,
    });
  } else {
    // request will be sent from browser
    // no props provided bc browser handles everything
    return axios.create({
      baseURL: process.env.API_CLIENT_URL,
    });
  }
};

export default buildClient;
