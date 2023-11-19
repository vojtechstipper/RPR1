import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:7038', // Nahraďte tímto URL adresu vašeho backendu
});

export default api;