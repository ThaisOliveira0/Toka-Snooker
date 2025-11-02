import axios from 'axios';
import jwt_decode from 'jwt-decode'; 

const API_URL = 'http://localhost:3000';

export async function login(email, senha) {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, senha });

    if (response.data.token) {
      const token = response.data.token;
      sessionStorage.setItem('token', token);

      const decoded = jwt_decode(token);
      const { id, role } = decoded;  

      return { token, id, role };
    }
    return response.data;
  } catch (error) {
    console.error('Erro ao fazer login:', error.response.data || error);
    throw error;
  }
}

export async function register(nome, email, telefone, senha, tipo_usuario) {
  try {
    const response = await axios.post(`${API_URL}/usuarios`, {
      nome,
      email,
      telefone,
      senha,
      tipo_usuario
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao cadastrar:', error.response?.data || error);
    throw error;
  }
}

export function getToken() {
  return sessionStorage.getItem('token');
}

export function getDecodedToken() {
  const token = getToken();
  if (!token) return null;

  try {
    return jwt_decode(token);
  } catch {
    return null;
  }
}

export function logout() {
  sessionStorage.removeItem('token');
}

export async function sendCode(email) {
  const response = await axios.post(`${API_URL}/login/recuperacao`, { email })
  return response.data
}

export async function verifyCode(email, codigo) {
  const response = await axios.post(`${API_URL}/login/verificar-codigo`, { email, codigo })
  return response.data
}

export async function resetPassword(id, senha) {
  const response = await axios.put(`${API_URL}/login/alterar-senha/${id}`, { senha })
  return response.data
}

