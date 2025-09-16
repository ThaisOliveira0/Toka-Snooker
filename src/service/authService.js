import api from "./api";

// Recuperar senha
export function forgotPassword(email) {
  return api.post("/auth/forgot-password", { email });
}

// Verificar código enviado por email
export function verifyCode(code) {
  return api.post("/auth/verify-code", { code });
}

// Redefinir senha
export function resetPassword(data) {
  return api.post("/auth/reset-password", data);
}

// Login
export function login(data) {
  return api.post("/auth/login", data);
}

// Registro de usuário
export function register(data) {
  // pode conter: { name, email,phone, password, confirmPassword }
  return api.post("/auth/register", data);
}

// Logout para expirar a sessão 
export function logout() {
  return api.post("/auth/logout");
}

//dados do user
export function me() {
  return api.get("/auth/me");
}