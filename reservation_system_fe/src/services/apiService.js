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


const getAllergens = async (navigate) => {
  try {
    const response = await api.get("/allergen/list");
    return response.data;
  } catch (error) {
    if (error.message === 'Připojení bylo odmítnuto. Zkontrolujte, zda je server spuštěn.') {
      navigate("/error", { state: { error: 'Připojení bylo odmítnuto. Zkontrolujte, zda je server spuštěn.' } });
    } else if (error.response) {
      navigate("/error", { state: { error: error.response.status } });
    } else {
      console.error('An error occurred:', error.message);
      navigate("/error", { state: { error: error.message } });
    }
  }
};

const getProductsGroupped = async (navigate) => {
  try {
    const response = await api.get("/product/groupped");
    return response.data;
  } catch (error) {
    if (error.message === 'Připojení bylo odmítnuto. Zkontrolujte, zda je server spuštěn.') {
      navigate("/error", { state: { error: 'Připojení bylo odmítnuto. Zkontrolujte, zda je server spuštěn.' } });
    } else if (error.response) {
      navigate("/error", { state: { error: error.response.status } });
    } else {
      console.error('An error occurred:', error.message);
      navigate("/error", { state: { error: error.message } });
    }
  }
};
const getProductsList = async (Page , Count, OrderBy, DescendingOrder, navigate) => {
  try {
    const response = await api.get("/product/list", {
      params: {
        Page: Page,
        Count: Count,
        OrderBy: OrderBy,
        DescendingOrder: DescendingOrder
    },
      headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    });
    return response.data;
  } catch (error) {
    if (error.message === 'Připojení bylo odmítnuto. Zkontrolujte, zda je server spuštěn.') {
      navigate("/error", { state: { error: 'Připojení bylo odmítnuto. Zkontrolujte, zda je server spuštěn.' } });
    } else if (error.response) {
      navigate("/error", { state: { error: error.response.status } });
    } else {
      console.error('An error occurred:', error.message);
      navigate("/error", { state: { error: error.message } });
    }
  }
};

// Funkce pro přidání produktu
const addProduct = async (productData, navigate) => {
  try {
    const response = await api.post("/product", productData, {
      headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    });
    toastNotify(response, "Produkt přidán!");
    return response.data;
  } catch (error) {
    navigate("/error", { state: { error: error.response.status } });
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
const getProductById = async (productId, navigate) => {
  try {
    const response = await api.get(`/product/${productId}`, {
      headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    });
    return response.data;
  } catch (error) {
    navigate("/error", { state: { error: error.response.status } });
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

const getAllergensDropdown = async (navigate) => {
  try {
    const response = await api.get(`/allergen/dropdown`, {
      headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    });
    return response.data;
  } catch (error) {
    navigate("/error", { state: { error: error.response.status } });
  }
};

const getProductTypesDropdown = async (navigate) => {
  try {
    const response = await api.get(`/productstypes/dropdown`, {
      headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    });
    return response.data;
  } catch (error) {
    navigate("/error", { state: { error: error.response.status } });
  }
};

const getNotStartedOrders = async (navigate) => {
  try {
    const response = await api.get(`/order/not-started`, {
      headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    });
    return response.data;
  } catch (error) {
    if (error.message === 'Připojení bylo odmítnuto. Zkontrolujte, zda je server spuštěn.') {
      navigate("/error", { state: { error: 'Připojení bylo odmítnuto. Zkontrolujte, zda je server spuštěn.' } });
    } else if (error.response) {
      navigate("/error", { state: { error: error.response.status } });
    } else {
      console.error('An error occurred:', error.message);
      navigate("/error", { state: { error: error.message } });
    }
  }
};

const getOrderTimesDropdown = async (navigate) => {
  try {
    const response = await api.get(`/order/order-times`, {
      headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    });
    return response.data;
  } catch (error) {
    navigate("/error", { state: { error: error.response.status } });
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

const sendChangeOrderStatusRequest = async (orderStatus, navigate) => {
  try {
    const response = await api.post("/order/accept", orderStatus, {
      headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    });
    return response.data;
  } catch (error) {
    navigate("/error", { state: { error: error.response.status } });
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

const loginUserRequest = async (userData, navigate) => {
  try {
    const response = await api.post("/auth/login", userData);
    toastNotify(response, "Uživatel přihlášen!");
    return response.data;
  } catch (error) {
    navigate("/error", { state: { error: error.response.status } });
  }
};

const registerUserRequest = async (userData, navigate) => {
  try {
    const response = await api.post("/users", userData);
    toastNotify(response, "Zaregistrován!");
    return response.data;
  } catch (error) {
    navigate("/error", { state: { error: error.response.status } });
  }
};

const getUsers = async (Page , Count, Filter, OrderBy, DescendingOrder, navigate ) => {
  try {

    const params = {
      Page: Page,
      Count: Count,
      OrderBy: OrderBy,
      DescendingOrder: DescendingOrder,
    };

    if (Filter && Filter.trim() !== '') {
      params.Filter = Filter;
    }

    const response = await api.get(`/users`, {
      params: params,
      headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    });

    return response.data;
  } catch (error) {
    if (error.message === 'Připojení bylo odmítnuto. Zkontrolujte, zda je server spuštěn.') {
      navigate("/error", { state: { error: 'Připojení bylo odmítnuto. Zkontrolujte, zda je server spuštěn.' } });
    } else if (error.response) {
      navigate("/error", { state: { error: error.response.status } });
    } else {
      console.error('An error occurred:', error.message);
      navigate("/error", { state: { error: error.message } });
    }
  }
};

const getUserById = async (userId, navigate) => {
  try {
    const response = await api.get(`/users/${userId}`, {
      headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    });
    return response.data;
  } catch (error) {
    navigate("/error", { state: { error: error.response.status } });
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

const resetPassword = async (passwordResetData) => {
  try {
    const response = await api.post(
      `/users/reset-password`,
      passwordResetData
    );
    toastNotify(response, "Požadavek na reset hesla odeslán!");
    return response.data;
  } catch (error) {
    toastNotify(error.response);
    throw error;
  }
};

const resetSetNewPassword = async (passwordResetData) => {
  try {
    const response = await api.post(
      `/users/set-password`,
      passwordResetData
    );
    toastNotify(response, "Požadavek na reset hesla odeslán!");
    return response.data;
  } catch (error) {
    toastNotify(error.response);
    throw error;
  }
};

const changePassword = async ({ userId, oldPassword, newPassword }) => {
  try {
    const response = await api.put('/users/password', {
      userId, 
      oldPassword, 
      newPassword
    }, {
      headers: { Authorization: `Bearer ${Cookies.get("token")}` }
    });

    toastNotify("Heslo bylo úspěšně změněno!", 'success');
    return response.data;
  } catch (error) {
    toastNotify(`Chyba při změně hesla: ${error.message}`, 'error');
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
  sendChangeOrderStepRequest,
  resetPassword,
  resetSetNewPassword,
  changePassword
};

function toastNotify(response, successMessage) {
  if (response.status === 200) toast.success(successMessage);
  else if (response.status === 400) {
    toast.error(`Chyba validace`);
  } else if (response.status === 500) toast.error("Neočekávaná chyba serveru");
}

const unavailableIntervals = [
  { start: "16:00", end: "17:00" },
];

export const fetchUnavailableIntervals = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(unavailableIntervals);
    }, 1000);
  });
};