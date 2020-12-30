import modal from "./modal";
import product from "./product";
import author from "./author";
import category from "./category";
import customer from "./customer";
import cart from "./cart";
import searchString from './searchString'
import shipCode from "./shipCode";
import { combineReducers } from "redux";
const rootReducer = combineReducers({
  modal,
  customer,
  productList: product,
  authorList: author,
  categoryList: category,
  cartList: cart,
  shipCode,
  searchString
});
export default rootReducer;
