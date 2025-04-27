import { $authHost, $host } from "./index";
import { jwtDecode } from "jwt-decode";

export const registration = async (email, password) => {
  try {
    const { data } = await $host.post("user/registration", {
      email,
      password,
    });
    localStorage.setItem("token", data.token);
    return jwtDecode(data.token);
  } catch (error) {
    console.error('Error during registration:', error);
    throw error;
  }
};

export const login = async (email, password) => {
  try {
    const { data } = await $host.post("user/login", { email, password });
    localStorage.setItem("token", data.token);
    return jwtDecode(data.token);
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

export const check = async () => {
  try {
    const { data } = await $authHost.get("user/auth");
    localStorage.setItem("token", data.token);
    return jwtDecode(data.token);
  } catch (error) {
    console.error('Error checking auth:', error);
    throw error;
  }
};
