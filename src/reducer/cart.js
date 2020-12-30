import * as Types from "../constants/reduxConst";
const initialState = {
  isLogin: false,
  data: [],
};

const myReducer = (state = initialState, { type, payload }) => {
  var newCart = {};
  var newData = {};
  var index = -1;
  var oldData = {};
  switch (type) {
    case Types.SET_CART:
      console.log("pa", payload);
      return { ...state, isLogin: true, data: payload.data };
    case Types.UPDATE_TO_CART_UP:
      newCart = payload.data;
      // Find index
      index = findIndex(state.data, newCart);
      // Create new array
      if (index >= 0) {
        oldData = state.data[index];
        oldData.quantity++;
        newData = [...state.data.slice(0, index), oldData, ...state.data.slice(index + 1)];
      } else {
        newData = [oldData, ...state.data.slice(index + 1)];
      }
      // return new state
      return { ...state, data: newData };

    case Types.UPDATE_TO_CART_DOWN:
      newCart = payload.data;
      // Find index
      index = findIndex(state.data, newCart);
      // Create new array
      if (index >= 0) {
        oldData = state.data[index];
        oldData.quantity--;
        newData = [...state.data.slice(0, index), oldData, ...state.data.slice(index + 1)];
      } else {
        newData = [oldData, ...state.data.slice(index + 1)];
      }
      // return new state
      return { ...state, data: newData };

    case Types.ADD_TO_CART:
      newCart = payload.data;
      // newData = state.data.concat(newCart);
      index = findIndex(state.data, newCart);
      // console.log("new",index,newCart);
      // Create new array
      if (index >= 0) {
        oldData = state.data[index];
        oldData.quantity++;
        newData = [...state.data.slice(0, index), oldData, ...state.data.slice(index + 1)];
      } else {
        newData = [newCart, ...state.data];
      }
      // return new state
      return { ...state, data: newData };

    case Types.DELETE_TO_CART:
      newCart = payload.data;
      // Find index
      index = findIndex(state.data, newCart);
      // Create new array
      if (index > 0) {
        newData = [...state.data.slice(0, index), ...state.data.slice(index + 1)];
      } else {
        newData = [...state.data.slice(index + 1)];
      }
      return { ...state, data: newData };
    case Types.DELETE_ALL_TO_CART:
      return { ...state, data: [] };
    default:
      return state;
  }
};

const findIndex = (array, newData) => {
  var result = -1;
  for (let i = 0; i < array.length; i++) {
    if (parseInt(newData.ProductID) === parseInt(array[i].ProductID)) {
      result = i;
    }
  }
  return result;
};

export default myReducer;
