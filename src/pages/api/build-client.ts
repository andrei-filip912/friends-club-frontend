import axios, { AxiosInstance } from "axios";
import { GetServerSidePropsContext } from "next";

const buildClient = (ctx?: GetServerSidePropsContext): AxiosInstance => {
  if (ctx && ctx.req) {
    // request will be sent from server
    return axios.create({
      baseURL:
        "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
      headers: ctx.req.headers,
    });
  } else {
    // request will be sent from browser
    // no props provided bc browser handles everything
    return axios.create({
      baseURL: "https://friends-club.dev",
    });
  }
};

export default buildClient;
