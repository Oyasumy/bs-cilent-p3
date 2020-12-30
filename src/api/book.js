import axios from "axios";
import { API_URL } from "../constants/configRedux";

export const getAllProduct = async (page) => {
  // console.log("x-key",process.env.X_API_KEY);
  var result = null;
  await axios
    .get(`${API_URL}/products/?page=${page}`, {
      headers: { "x-api-key": "mewmew" },
    })
    .then((res) => {
      if (res.status === 200) {
        result = res.data;
      }
    })
    .catch((err) => {
      console.log(err);
    });
  return result;
};

export const getAllAuthor = async () => {
  // console.log("x-key",process.env.X_API_KEY);
  var result = null;
  await axios
    .get(`${API_URL}/authors`, {
      headers: { "x-api-key": "mewmew" },
    })
    .then((res) => {
      // console.log("res",res);
      if (res.status === 200) {
        result = res.data;
      }
    })
    .catch((err) => {
      console.log(err);
    });
  return result;
};

export const getAllCategory = async () => {
  // console.log("x-key",process.env.X_API_KEY);
  var result = null;
  await axios
    .get(`${API_URL}/categories`, {
      headers: { "x-api-key": "mewmew" },
    })
    .then((res) => {
      // console.log("res",res);
      if (res.status === 200) {
        result = res.data;
      }
    })
    .catch((err) => {
      console.log(err);
    });
  return result;
};

// Add customer
export const addCustomer = async (data) => {
  // console.log("x-key",process.env.X_API_KEY);
  var result = null;
  await axios
    .post(`${API_URL}/customers/post`, data, {
      headers: { "x-api-key": "mewmew" },
    })
    .then((res) => {
      console.log("res", res);
      if (res.status === 200) {
        result = res.data;
      }
    })
    .catch((err) => {
      console.log(err);
    });
  return result;
};

// Check customer
export const checkCustomer = async (data) => {
  // console.log("x-key",process.env.X_API_KEY);
  var result = null;
  await axios
    .post(`${API_URL}/customers/check`, data, {
      headers: { "x-api-key": "mewmew" },
    })
    .then((res) => {
      console.log("res", res);
      if (res.status === 200) {
        result = res.data;
      }
    })
    .catch((err) => {
      console.log(err);
    });
  return result;
};

// Get list Product
export const getListProduct = async (data) => {
  // console.log("x-key",process.env.X_API_KEY);
  var result = null;
  await axios
    .post(`${API_URL}/products/list-product`, { data }, { headers: { "x-api-key": "mewmew" } })
    .then((res) => {
      if (res.status === 200) {
        result = res.data;
      }
    })
    .catch((err) => {
      console.log(err);
    });
  return result;
};
// Get all cart
export const getAllCart = async (id) => {
  // console.log("x-key",process.env.X_API_KEY);
  console.log("id", id);
  var result = null;
  await axios
    .post(
      `${API_URL}/carts/`,
      { id: id },
      {
        headers: { "x-api-key": "mewmew" },
      }
    )
    .then((res) => {
      if (res.status === 200) {
        result = res.data;
      }
    })
    .catch((err) => {
      console.log(err);
    });
  return result;
};

// Get delete cart
export const deleteCart = async (idC, idP) => {
  // console.log("x-key",process.env.X_API_KEY);
  console.log("dt", idC, idP);
  var result = null;
  await axios
    .post(
      `${API_URL}/carts/delete`,
      { CustomerID: idC, ProductID: idP },
      {
        headers: { "x-api-key": "mewmew" },
      }
    )
    .then((res) => {
      if (res.status === 200) {
        result = res.data;
      }
    })
    .catch((err) => {
      console.log(err);
    });
  return result;
};

// Get add cart
export const addCart = async (idC, idP, num) => {
  // console.log("x-key",process.env.X_API_KEY);
  console.log("dt", idC, idP, num);
  var result = null;
  await axios
    .post(
      `${API_URL}/carts/post`,
      { CustomerID: idC, ProductID: idP, quantity: num },
      {
        headers: { "x-api-key": "mewmew" },
      }
    )
    .then((res) => {
      if (res.status === 200) {
        result = res.data;
      }
    })
    .catch((err) => {
      console.log(err);
    });
  return result;
};

// update  cart
export const updateCart = async (idC, idP, num) => {
  // console.log("x-key",process.env.X_API_KEY);
  console.log("dt", idC, idP, num);
  var result = null;
  await axios
    .put(
      `${API_URL}/carts/update`,
      { CustomerID: idC, ProductID: idP, quantity: num },
      {
        headers: { "x-api-key": "mewmew" },
      }
    )
    .then((res) => {
      if (res.status === 200) {
        result = res.data;
      }
    })
    .catch((err) => {
      console.log(err);
    });
  return result;
};

// Check discount code
export const checkCodeDiscount = async (data) => {
  // console.log("x-key",process.env.X_API_KEY);
  var result = null;
  await axios
    .post(
      `${API_URL}/discounts/check-code`,
      { code: data },
      {
        headers: { "x-api-key": "mewmew" },
      }
    )
    .then((res) => {
      console.log("res", res);
      if (res.status === 200) {
        result = res.data;
      }
    })
    .catch((err) => {
      console.log(err);
    });
  return result;
};

// Check ship code
export const checkShipCode = async (data) => {
  // console.log("x-key",process.env.X_API_KEY);
  var result = null;
  await axios
    .post(
      `${API_URL}/ship-code/check-code`,
      { address: data },
      {
        headers: { "x-api-key": "mewmew" },
      }
    )
    .then((res) => {
      console.log("res", res);
      if (res.status === 200) {
        result = res.data;
      }
    })
    .catch((err) => {
      console.log(err);
    });
  return result;
};

// create order
export const postOrder = async (data) => {
  // console.log("x-key",process.env.X_API_KEY);
  var result = null;
  await axios
    .post(`${API_URL}/oder/post`, {data}, {
      headers: { "x-api-key": "mewmew" },
    })
    .then((res) => {
      console.log("res", res);
      if (res.status === 200) {
        result = res.data;
      }
    })
    .catch((err) => {
      console.log(err);
    });
  return result;
};

// create order with strange customer
export const postOrderCustomerStrange = async (data) => {
  // console.log("x-key",process.env.X_API_KEY);
  var result = null;
  await axios
    .post(`${API_URL}/oder/post-cus-strange`, {data}, {
      headers: { "x-api-key": "mewmew" },
    })
    .then((res) => {
      console.log("res", res);
      if (res.status === 200) {
        result = res.data;
      }
    })
    .catch((err) => {
      console.log(err);
    });
  return result;
};

// get order with  customer
export const getOrderCustomer = async (idC) => {
  console.log("idc",idC);
  // console.log("x-key",process.env.X_API_KEY);
  var result = null;
  await axios
    .post(`${API_URL}/oder/get-oder-cus`, {idC}, {
      headers: { "x-api-key": "mewmew" },
    })
    .then((res) => {
      console.log("res", res);
      if (res.status === 200) {
        result = res.data;
      }
    })
    .catch((err) => {
      console.log(err);
    });
  return result;
};

// Edit Author
export const getEditCustomer = async (data) => {
  // console.log("x-key",process.env.X_API_KEY);
  var result = null;
  await axios
    .put(
      `${API_URL}/customers/update`,
       data ,
      {
        headers: { "x-api-key": "mewmew" },
      }
    )
    .then((res) => {
      // console.log("res",res);
      if (res.status === 200) {
        result = res.data;
      }
    })
    .catch((err) => {
      console.log(err);
    });
  return result;
};

// Edit Pass Author
export const getEditPassCustomer = async (data) => {
  // console.log("x-key",process.env.X_API_KEY);
  var result = null;
  await axios
    .put(
      `${API_URL}/customers/update-password`,
       data ,
      {
        headers: { "x-api-key": "mewmew" },
      }
    )
    .then((res) => {
      // console.log("res",res);
      if (res.status === 200) {
        result = res.data;
      }
    })
    .catch((err) => {
      console.log(err);
    });
  return result;
};


// Cancel order
export const setCancelOrder = async (data) => {
  // console.log("x-key",process.env.X_API_KEY);
  var result = null;
  await axios
    .post(`${API_URL}/oder/cancel-order`, data, {
      headers: { "x-api-key": "mewmew" },
    })
    .then((res) => {
      // console.log("res",res);
      if (res.status === 200) {
        result = res.data;
      }
    })
    .catch((err) => {
      console.log(err);
    });
  return result;
};

// Get detail order with Order ID
export const getOrderDetailAPI = async (data) => {
  // console.log("x-key",process.env.X_API_KEY);
  var result = null;
  await axios
    .post(
      `${API_URL}/oder/get-detail-order`,
      { id: data },
      {
        headers: { "x-api-key": "mewmew" },
      }
    )
    .then((res) => {
      // console.log("res",res);
      if (res.status === 200) {
        result = res.data;
      }
    })
    .catch((err) => {
      console.log(err);
    });
  return result;
};

export const getShipCodeWithID = async (data) => {
  // console.log("x-key",process.env.X_API_KEY);
  var result = null;
  await axios
    .post(
      `${API_URL}/ship-code/get-ship-code`,
      { id: data },
      {
        headers: { "x-api-key": "mewmew" },
      }
    )
    .then((res) => {
      // console.log("res",res);
      if (res.status === 200) {
        result = res.data;
      }
    })
    .catch((err) => {
      console.log(err);
    });
  return result;
};

export const getDiscountWithID = async (data) => {
  // console.log("x-key",process.env.X_API_KEY);
  var result = null;
  await axios
    .post(
      `${API_URL}/discounts/get-discount`,
      { id: data },
      {
        headers: { "x-api-key": "mewmew" },
      }
    )
    .then((res) => {
      // console.log("res",res);
      if (res.status === 200) {
        result = res.data;
      }
    })
    .catch((err) => {
      console.log(err);
    });
  return result;
};