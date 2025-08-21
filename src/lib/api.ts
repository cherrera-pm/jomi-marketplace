import axios from "axios";
export const api = axios.create({
  baseURL: "/jomi-api",
  withCredentials: true, // envía/recibe cookies de sesión SSO
});
