import api from "./api";

export function forgotPassword(email) {
  return api.post("/auth/forgot-password", { email });
}

export function verifyCode(code) {
  return api.post("/auth/verify-code", { code });
}

export function resetPassword(data) {
  return api.post("/auth/reset-password", data);
}

export function login(data) {
  return api.post("/login", data);
}

export function register(data) {
  return api.post("/auth/register", data);
}

export function logout() {
  return api.post("/auth/logout");
}

export function me() {
  return api.get("/auth/me");
}