import axios from "axios";

export const baseUrl = axios.create({
  baseURL: "http://69.48.179.90:5000/api",
});
