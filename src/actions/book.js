import * as Types from "../constants/reduxConst";
// Set data book
export const handleSetProducts = (data) => ({
  type: Types.SET_PRODUCT,
  payload: {
    data,
  },
});
// Set data book
export const handleSetAuthors = (data) => ({
  type: Types.SET_AUTHOR,
  payload: {
    data,
  },
});
// Set data book
export const handleSetCategories = (data) => ({
  type: Types.SET_CATEGORY,
  payload: {
    data,
  },
});
// Set data book
export const handleSetCustomer = (data) => ({
  type: Types.SET_CUSTOMER,
  payload: {
    data,
  },
});
// Set data book
export const handleDeleteCustomer = () => ({
  type: Types.DELETE_CUSTOMER,
});

// Cart
export const handleSetCart = (data) => ({
  type: Types.SET_CART,
  payload: {
    data,
  },
});
export const handleAddCart = (data) => ({
  type: Types.ADD_TO_CART,
  payload: {
    data,
  },
});
export const handleUpdateCartUp = (data) => ({
  type: Types.UPDATE_TO_CART_UP,
  payload: {
    data,
  },
});
export const handleUpdateCartDown = (data) => ({
  type: Types.UPDATE_TO_CART_DOWN,
  payload: {
    data,
  },
});
export const handleDeleteCart = (data) => ({
  type: Types.DELETE_TO_CART,
  payload: {
    data,
  },
});
export const handleDeleteAllCart = (data) => ({
  type: Types.DELETE_ALL_TO_CART,
  payload: {
    data,
  },
});
export const handleSetShipCode = (data) => ({
  type: Types.SET_SHIP_CODE,
  payload: {
    data,
  },
});
export const handleDeleteShipCode = () => ({
  type: Types.DELETE_SHIP_CODE,
});
export const handleSetSearchString = (data) => ({
  type: Types.SET_SEARCH_STRING,
  payload: {
    data,
  },
});