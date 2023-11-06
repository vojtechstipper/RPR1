import api from './api';

// Funkce pro získání seznamu produktů
export const getProducts = async () => {
  try {
    const response = await api.get('/product/list');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Funkce pro přidání produktu
export const addProduct = async (productData) => {
  try {
    const response = await api.post('/product', productData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Funkce pro editaci produktu
export const editProduct = async (productId, productData) => {
  try {
    const response = await api.put(`/product/${productId}/edit`, productData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Funkce pro získání produktu podle ID
export const getProductById = async (productId) => {
  try {
    const response = await api.get(`/product/${productId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Zde můžete vytvořit další funkce pro práci s API.
