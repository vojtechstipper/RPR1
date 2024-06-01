import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:7038' 
});

api.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      if (error.code === 'ECONNREFUSED' || error.message.includes('ERR_CONNECTION_REFUSED')) {
        console.error('Připojení bylo odmítnuto. Zkontrolujte, zda je server spuštěn.');
        return Promise.reject(new Error('Připojení bylo odmítnuto. Zkontrolujte, zda je server spuštěn.'));
      }
      return Promise.reject(error);
    }
);

export default api;