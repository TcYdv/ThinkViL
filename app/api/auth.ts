import axiosClient from "./axiosClient";

export const signup = async (username: string, email: string, password: string) => {
  return axiosClient.post("/auth/signup", { username, email, password });
};

export const login = async (email: string, password: string) => {
  const response = await axiosClient.post("/auth/signin", { email, password });
  if (response.data && response.data.jwt) {
    localStorage.setItem("token", response.data.jwt);
  }
  return response.data;
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const logout = () => {
    localStorage.removeItem("token");
  };
