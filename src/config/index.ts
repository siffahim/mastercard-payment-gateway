import axios from "axios";

export const baseUrl = axios.create({
  baseURL: "https://mastercard-server.vercel.app/api",
});
