import api from "./api";
import jwt_decode from "jwt-decode";

export async function login(email, senha) {
  try {
    const response = await api.post("/login", { email, senha });

    if (response.data.token) {
      const token = response.data.token;

      sessionStorage.setItem("token", token);

      const decoded = jwt_decode(token);
      const { id, role } = decoded;

      sessionStorage.setItem("userId", id);
      sessionStorage.setItem("userRole", role);

      return { token, id, role };
    }

    return response.data;
  } catch (error) {
    console.error("Erro ao fazer login:", error.response?.data || error);
    throw error;
  }
}

export async function register(userData) {
  try {
    const data = {
      ...userData
    };

    const response = await api.post("/usuarios", data);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Erro ao cadastrar:", error.response?.data || error);
    throw error;
  }
}


export function forgotPassword(email) {
  return api.post("/auth/forgot-password", { email });
}

export function verifyCode(code) {
  return api.post("/auth/verify-code", { code });
}

export function resetPassword(data) {
  return api.post("/auth/reset-password", data);
}

export function logout() {
  return api.post("/auth/logout");
}

export function me() {
  return api.get("/auth/me");
}