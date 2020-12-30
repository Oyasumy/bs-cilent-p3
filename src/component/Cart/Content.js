/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./st.css";

import NavBarDetail from "../Detail/NavBarDetail";
import Search from "../ListProduct/Search";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import * as actionBooks from "../../actions/book";
import { Button } from "semantic-ui-react";
import Swal from "sweetalert2";
import { loadCheckCodeDiscount, loadDeleteCart, loadPostOrder, loadPostOrderCustomerStrange, loadUpdateCart } from "../../commons/callApi";
import { main } from "../../commons/checkData";
import OderModal from "./Oder";
import { TypeCustomer } from "../../constants/configRedux";

const Content = ({ cartState, actionBook, customerState, shipCodeState }) => {
  const [subTotal, setSubTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [valueCode, setValueCode] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [shipWithNone, setShipWithNone] = useState({ address: "Anywhere", cost: 50 });

  const [pointCus, setPointCus] = useState(null);

  const [costDown, setCostDown] = useState(0);

  useEffect(() => {
    console.log("c", customerState);
    TypeCustomer.forEach((element) => {
      if (customerState.data.point > element.min && customerState.data.point < element.max) {
        setPointCus(element);
        // setPoint((customerState.data.point / pointCus.max).toFixed(0));
      }
    });
  }, []);

  // func
  const onDownCart = async (cart) => {
    if (!customerState.isLogin) {
      const { handleUpdateCartDown } = actionBook;
      handleUpdateCartDown(cart);
    } else {
      const { CustomerID } = customerState.data;
      var { ProductID, quantity } = cart;
      const newQ = quantity--;
      // console.log("q",quantity,newQ);
      await loadUpdateCart(CustomerID, ProductID, quantity).then((res) => {
        if (res) {
          const { handleUpdateCartDown } = actionBook;
          handleUpdateCartDown(cart);
        }
      });
    }
  };
  const onUpCart = async (cart) => {
    if (!customerState.isLogin) {
      const { handleUpdateCartUp } = actionBook;
      handleUpdateCartUp(cart);
    } else {
      const { CustomerID } = customerState.data;
      var { ProductID, quantity } = cart;
      const newQ = quantity++;
      await loadUpdateCart(CustomerID, ProductID, quantity).then((res) => {
        if (res) {
          const { handleUpdateCartUp } = actionBook;
          handleUpdateCartUp(cart);
        }
      });
    }
  };
  const onRemoveCart = async (cart) => {
    if (!customerState.isLogin) {
      const { handleDeleteCart } = actionBook;
      handleDeleteCart(cart);
      Swal.fire({
        // position: 'top-end',
        icon: "success",
        title: "Remove success!!",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      // console.log("cus",customerState);
      const { CustomerID } = customerState.data;
      // console.log("de",CustomerID,cart.ProductID);
      await loadDeleteCart(CustomerID, cart.ProductID)
        .then((res) => {
          console.log("res", res);
          if (res) {
            const { handleDeleteCart } = actionBook;
            handleDeleteCart(cart);
            Swal.fire({
              // position: 'top-end',
              icon: "success",
              title: "Remove success!!",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        })
        .catch((er) => {
          Swal.fire({
            // position: 'top-end',
            icon: "error",
            title: "Something went wrong!!",
            showConfirmButton: false,
            timer: 1500,
          });
        });
    }
  };
  // check code dis count
  const checkCode = async (data) => {
    if (data === "") return;
    if (!main([data])) return;
    console.log("da", data);
    await loadCheckCodeDiscount(data)
      .then((res) => {
        console.log("rs,", res);
        if (!res) {
          Swal.fire({
            // position: 'top-end',
            icon: "error",
            title: " Error!!",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          if (res.result.length > 0) {
            setDiscount(res.result[0]);
            Swal.fire({
              // position: 'top-end',
              icon: "success",
              title: " Apply success!!",
              showConfirmButton: false,
              timer: 1500,
            });
          } else {
            Swal.fire({
              // position: 'top-end',
              icon: "warning",
              title: "Code not found!!",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        }
      })
      .catch((er) => {
        console.log("err", er);
        Swal.fire({
          // position: 'top-end',
          icon: "error",
          title: " Error!!",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };
  // component
  const showListCart = (cartState) => {
    var result = null;
    result = cartState.map((cart, i) => {
      return (
        <li class={`items ${i % 2 === 0 ? "odd" : "even"}`}>
          <div class="infoWrap">
            <div class="cartSection">
              <img src={cart.images ? cart.images[0].url : ""} alt="" class="itemImg" />
              <p class="itemNumber">ID: {cart ? cart.ProductID : ""}</p>
              <h3>Name: {cart ? cart.NameProduct : ""}</h3>

              <p>
                <Button.Group>
                  <Button onClick={() => (cart.quantity > 0 ? onDownCart(cart) : null)}>Down</Button>
                  <Button>
                    <input type="text" value={cart.quantity} readOnly class="qty" style={{ margin: "0px", borderColor: "floralwhite", borderRadius: "20%" }} />
                  </Button>
                  <Button onClick={() => (cart.quantity < 10 ? onUpCart(cart) : null)}>Up</Button>
                </Button.Group>{" "}
              </p>

              <p class="stockStatus">${cart ? cart.PriceProduct : 0}</p>
            </div>

            <div class="prodTotal cartSection">
              <p>${cart ? cart.quantity * cart.PriceProduct : 0}</p>
            </div>
            <div class="cartSection removeWrap">
              <a href class="remove" onClick={() => onRemoveCart(cart)}>
                x
              </a>
            </div>
          </div>
        </li>
      );
    });
    return result;
  };
  // Update Price
  useEffect(() => {
    setSubTotal(totalPrice(cartState));
  }, [cartState]);

  // Update Price
  useEffect(() => {
    if (customerState.isLogin && subTotal) {
      setCostDown((subTotal * pointCus.dis) / 100);
    }
  }, [subTotal, pointCus, customerState]);

  const totalPrice = (cartState) => {
    var result = 0;
    if (cartState.length > 0) {
      cartState.forEach((cart) => {
        result += cart.PriceProduct * cart.quantity;
      });
    }
    return result;
  };
  // Payment
  const onPayment = async (data) => {
    console.log("dt", data);
    console.log("dt2", cartState);
    var newPro = [];

    cartState.forEach((element) => {
      // eslint-disable-next-line no-unused-vars
      var obj = { ProductID: element.ProductID, QuantityProduct: element.quantity };
      newPro.push(obj);
    });

    const newData = { ...data, newPro: newPro };
    // return;
    if (data.CusNone) {
      console.log("st");
      await loadPostOrderCustomerStrange(newData)
        .then((res) => {
          console.log("res", res);
          if (res.msg === "ok") {
            Swal.fire({
              // position: 'top-end',
              icon: "success",
              title: "Thank for Payment!!",
              showConfirmButton: false,
              timer: 1500,
            });
            setOpenModal(false);
            actionBook.handleDeleteAllCart();
          }
        })
        .catch((er) => {
          console.log("er", er);
          Swal.fire({
            // position: 'top-end',
            icon: "error",
            title: "Some thing went wrong!!",
            showConfirmButton: false,
            timer: 1500,
          });
        });
    } else {
      console.log("nm");
      await loadPostOrder(newData)
        .then((res) => {
          console.log("res", res);
          if (res.msg === "ok") {
            Swal.fire({
              // position: 'top-end',
              icon: "success",
              title: "Thank for Payment!!",
              showConfirmButton: false,
              timer: 1500,
            });
            setOpenModal(false);
            actionBook.handleDeleteAllCart();
          }
        })
        .catch((er) => {
          console.log("er", er);
          Swal.fire({
            // position: 'top-end',
            icon: "error",
            title: "Some thing went wrong!!",
            showConfirmButton: false,
            timer: 1500,
          });
        });
    }
  };
  return (
    <>
      <OderModal
        open={openModal}
        setOpen={(e) => setOpenModal(e)}
        customerState={customerState}
        cartState={cartState}
        shipCode={Object.keys(shipCodeState).length ? shipCodeState : shipWithNone}
        discount={discount}
        total={subTotal - (subTotal * (discount.percent || 0)) / 100 - costDown}
        subTotal={subTotal}
        onPayment={onPayment}
      />
      <NavBarDetail />
      <Search />
      <div class="wrap cf">
        <h1 class="projTitle">Shopping Cart</h1>
        <div class="heading cf">
          <h1>My Cart</h1>
          <Link to="/list-product">
            <a href="" class="continue">
              Continue Shopping
            </a>
          </Link>
        </div>
        <div class="cart">
          {/* <!-- */}
          <ul class="tableHead">
            <li class="prodHeader">Product</li>
            <li>Quantity</li>
            <li>Total</li>
            <li>Remove</li>
          </ul>
          {/* --> */}
          <ul class="cartWrap">{cartState ? showListCart(cartState) : null}</ul>
        </div>

        <div class="promoCode">
          <label for="promo">Have A Promo Code?</label>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <input type="text" value={valueCode} onChange={(e) => setValueCode(e.target.value)} placholder="Enter Code" />
            <a href class="btn" onClick={() => checkCode(valueCode)}></a>
          </div>
        </div>

        <div class="subtotal cf">
          <ul style={{ listStyle: "none" }}>
            <li class="totalRow">
              <span class="label">Subtotal</span>
              <span class="value">${subTotal}</span>
            </li>

            {/* <li class="totalRow">
              <span class="label">Shipping</span>
              <span class="value">$5.00</span>
            </li> */}

            <li class="totalRow">
              <span class="label">Tax</span>
              <span class="value">{discount.percent || 0} %</span>
            </li>
            {customerState.isLogin ? (
              <li class="totalRow">
                <span class="label">Discount per Type Customer</span>
                <span class="value">{costDown}$</span>
              </li>
            ) : (
              ""
            )}
            <li class="totalRow final">
              <span class="label">Total</span>
              <span class="value">${subTotal - (subTotal * (discount.percent || 0)) / 100-costDown}</span>
            </li>
            <li class="totalRow">
              <a
                class="btn continue"
                onClick={() => setOpenModal(true)}
                style={{
                  textDecoration: "none",
                  fontFamily: "Montserrat",
                  letterSpacing: "-.015em",
                  fontSize: "1em",
                  padding: "1em 3em",
                  color: "#fff",
                  background: " #82ca9c",
                  fontWeight: "bold",
                  borderRadius: "50px",
                  float: "right",
                  textAlign: "right",
                  transition: " all 0.25s linear",
                }}>
                Checkout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  cartState: state.cartList.data,
});
const mapDispatchToProps = (dispatch) => ({
  actionBook: bindActionCreators({ ...actionBooks }, dispatch),
});
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect)(Content);
