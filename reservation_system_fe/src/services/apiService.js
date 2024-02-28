import { toast } from 'react-toastify';
import api from './api';
// Funkce pro získání seznamu produktů
 const getProducts = async () => {
  try {
    const response = await api.get('/product/list');
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getAllergens = async () => {
  try {
    const response = await api.get('/allergen/list');
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
 const getProductsList = async () => {
  try {
    const response = await api.get('/product/list');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Funkce pro přidání produktu
 const addProduct = async (productData) => {
  try {
    const response = await api.post('/product', productData);
    toastNotify(response, "Produkt přidán!")
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Funkce pro editaci produktu
 const editProduct = async ( productData) => {
   try {
     const response = await api.put(`/product/edit`, productData);
    toastNotify(response, "Produkt upraven!");
    return response.data;
  } catch (error) {
    toastNotify(error.response);
    throw error;
  }
};

const deleteProduct = async ( productId) => {
  try {
    const response = await api.delete(`/product/${productId}`);
    toastNotify(response, "Produkt smazán!")
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

const uploadImage = async (image) => {
  try {
    const response = await api.post(`/product/image`,image);
    toastNotify(response,"Obrázek nahrán!")
    return response.data;
  } catch (error) {
    throw error;
  }
};
const getImage = async (imageId) => {
  try {
    const response = await api.get(`/`,imageId);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getAllergensDropdown = async () => {
  try {
    const response = await api.get(`/allergen/dropdown`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


const getProductTypesDropdown = async () => {
  try {
    const response = await api.get(`/productstypes/dropdown`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getNotStartedOrders = async () => {
  try {
    const response = await api.get(`/order/not-started`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getOrderTimesDropdown = async () => {
  try {
    const response = await api.get(`/order/order-times`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const sendOrder = async (orderData) => {
  try {
    const response = await api.post("/order", orderData);
    toastNotify(response, "Objednávka odeslána!");
    return response.data;
  } catch (error) {
    throw error;
  }
};

const sendChangeOrderStatusRequest = async (orderStatus) => {
  try {
    const response = await api.post("/order/accept", orderStatus);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export {
  getProductsGroupped,
  getProductById,
  getProducts,
  getAllergens,
  getProductsList,
  getAllergensDropdown,
  addProduct,
  editProduct,
  deleteProduct,
  getProductTypesDropdown,
  sendOrder,
  getNotStartedOrders,
  sendChangeOrderStatusRequest,
  getOrderTimesDropdown,
  uploadImage,
  getImage,
};


  function toastNotify(response, successMessage) {
    if (response.status === 200) toast.success(successMessage);
    else if (response.status === 400 ) {
        console.log(response.data.errors);
        toast.error(`Chyba validace`);
    }
    else if (response.status === 500) toast.error("Neočekávaná chyba serveru");
  }
