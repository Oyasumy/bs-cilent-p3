import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import Content from "./Content";
import * as actionProduct from "../../actions/book";
import { loadAllCart } from "../../commons/callApi";

const Cart = ({ actionProducts, cartState, customerState,shipCodeState }) => {
  // useEffect(() => {
  //   console.log("init",cartState.length);
  //   // if (!cartState) return;
  //   initData();
  // }, []);
  // const initData = async (id) => {
  //   if (customerState.isLogin) {
  //     const res = await loadAllCart(customerState.data.CustomerID);
  //     const { handleSetCart } = actionProducts;
  //     handleSetCart(res);
  //   }
  // };
  // useEffect(() => {
  //   if (!customerState) return;
  //   initData();
  // }, [customerState]);
  return <Content customerState={customerState} cartState={cartState} shipCodeState={shipCodeState}/>;
};

const mapStateToProps = (state) => ({
  customerState: state.customer,
  cartState: state.cartList.data,
  shipCodeState:state.shipCode.data,
});
const mapDispatchToProps = (dispatch) => ({
  actionProducts: bindActionCreators({ ...actionProduct }, dispatch),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect)(Cart);
