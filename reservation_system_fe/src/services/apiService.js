import { toast } from "react-toastify";
import api from "./api";
import Cookies from "js-cookie";

const getProducts = async () => {
  try {
    const response = await api.get("/product/list");
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getAllergens = async () => {
  try {
    const response = await api.get("/allergen/list");
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getProductsGroupped = async () => {
  try {
    const response = await api.get("/product/groupped");
    return response.data;
  } catch (error) {
    throw error;
  }
};
const getProductsList = async () => {
  try {
    const response = await api.get("/product/list", {
      headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Funkce pro přidání produktu
const addProduct = async (productData) => {
  try {
    const response = await api.post("/product", productData, {
      headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    });
    toastNotify(response, "Produkt přidán!");
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Funkce pro editaci produktu
const editProduct = async (productData) => {
  try {
    const response = await api.put(`/product/edit`, productData, {
      headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    });
    toastNotify(response, "Produkt upraven!");
    return response.data;
  } catch (error) {
    toastNotify(error.response);
    throw error;
  }
};

const deleteProduct = async (productId) => {
  try {
    const response = await api.delete(`/product/${productId}`, {
      headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    });
    toastNotify(response, "Produkt smazán!");
    return response.data;
  } catch (error) {
    toastNotify(error.response);
    throw error;
  }
};

// Funkce pro získání produktu podle ID
const getProductById = async (productId) => {
  try {
    const response = await api.get(`/product/${productId}`, {
      headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const uploadImage = async (image) => {
  try {
    const response = await api.post(`/product/image`, image, {
      headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    });
    toastNotify(response, "Obrázek nahrán!");
    return response.data;
  } catch (error) {
    toastNotify(error.response);
    throw error;
  }
};
const getImage = async (imageId) => {
  try {
    const response = await api.get(`/`, imageId);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getAllergensDropdown = async () => {
  try {
    const response = await api.get(`/allergen/dropdown`, {
      headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getProductTypesDropdown = async () => {
  try {
    const response = await api.get(`/productstypes/dropdown`, {
      headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getNotStartedOrders = async () => {
  try {
    const response = await api.get(`/order/not-started`, {
      headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getOrderTimesDropdown = async () => {
  try {
    const response = await api.get(`/order/order-times`, {
      headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const sendOrder = async (orderData) => {
  try {
    const response = await api.post("/order", orderData, {
      headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    });
    toastNotify(response, "Objednávka odeslána!");
    return response.data;
  } catch (error) {
    toastNotify(error.response);
    throw error;
  }
};

const sendChangeOrderStatusRequest = async (orderStatus) => {
  try {
    const response = await api.post("/order/accept", orderStatus, {
      headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const sendChangeOrderStepRequest = async (orderStatus) => {
  // try {
    const response = await api.put("/order/change-step", orderStatus, {
      headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    });
    return response.data;
  // } catch (error) {
  //   throw error;
  // }
};

const loginUserRequest = async (userData) => {
  try {
    const response = await api.post("/auth/login", userData);
    toastNotify(response, "Uživatel přihlášen!");
    return response.data;
  } catch (error) {
    throw error;
  }
};

const registerUserRequest = async (userData) => {
  try {
    const response = await api.post("/users", userData);
    toastNotify(response, "Zaregistrován!");
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getUsers = async (Page , Count ) => {
  try {
    const response = await api.get(`/users`, {
      params: {
        Page: Page,
        Count: Count
      },
      headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    });
    console.log(response)
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getUserById = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}`, {
      headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const editUser = async (userData) => {
  try {
    const response = await api.put(`/users/edit`, userData, {
      headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    });
    toastNotify(response, "Uživatel upraven!");
    return response.data;
  } catch (error) {
    toastNotify(error.response);
    throw error;
  }
};

const deleteUser = async (userId) => {
  try {
    const response = await api.delete(`/users/${userId}`, {
      headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    });
    toastNotify(response, "Uživatel smazán!");
    return response.data;
  } catch (error) {
    toastNotify(error.response);
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
  loginUserRequest,
  registerUserRequest,
  getUsers,
  getUserById,
  editUser,
  deleteUser,
  sendChangeOrderStepRequest
};

function toastNotify(response, successMessage) {
  if (response.status === 200) toast.success(successMessage);
  else if (response.status === 400) {
    toast.error(`Chyba validace`);
  } else if (response.status === 500) toast.error("Neočekávaná chyba serveru");
}

const unavailableIntervals = [
  { start: "10:00", end: "14:00" },
];

export const fetchUnavailableIntervals = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(unavailableIntervals);
    }, 1000);
  });
};