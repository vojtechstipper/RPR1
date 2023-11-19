import api from './api';
import getProductsGrouppedResponseObject from '../responses/getProductsGrouppedResponse';
// Funkce pro získání seznamu produktů
 const getProducts = async () => {
  try {
    const response = await api.get('/product/list');
    return response.data;
  } catch (error) {
    throw error;
  }
};

 const getProductsGroupped = async () => {
  try {
    const response = await api.get('/product/groupped');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Funkce pro přidání produktu
 const addProduct = async (productData) => {
  try {
    const response = await api.post('/product', productData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Funkce pro editaci produktu
 const editProduct = async (productId, productData) => {
  try {
    const response = await api.put(`/product/${productId}/edit`, productData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Funkce pro získání produktu podle ID
 const getProductById = async (productId) => {
  try {
    const response = await api.get(`/product/${productId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { getProductsGroupped, getProductById, getProducts };

// Zde můžete vytvořit další funkce pro práci s API.
