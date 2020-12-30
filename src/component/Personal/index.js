import React, { useEffect, useState } from "react";
// import Content from "../Detail/Content";
import NavBarDetail from "../Detail/NavBarDetail";
import Content from "./content";

import * as actionProduct from "../../actions/book";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import { loadCustomer, loadGetOrderCustomer } from "../../commons/callApi";
import { getOrderDetailAPI,getDiscountWithID,getShipCodeWithID,setCancelOrder } from "../../api/book";
import ModalDetail from "./modalDetail";
import { Redirect } from "react-router-dom";
import { HOME } from "../../constants/configRedux";
import Swal from "sweetalert2";

const Personal = ({ customerState, actionProducts }) => {
  const [orderState, setOrderState] = useState([]);
  const [detailOrder, setDetailOrder] = useState([]);
  const [open, setOpen] = useState(false);
const [openCancel, setOpenCancel] = useState(false);
  // init to load order
  useEffect(() => {
    console.log("load order");
    initData();
  }, [customerState]);
  // load detail order
  // useEffect(() => {

  // }, [])
  const initData = async () => {
    const res = await loadGetOrderCustomer(customerState.data.CustomerID);
    if (res.msg === "ok") {
      setOrderState(res.result);
    }
  };
  // function
  // 2
  // Change State order
  const getDetailOrder = async (prop) => {
    console.log(prop);
    // setShowModal(true);
    var newRes = { order: prop };
    // get detail order
    await getOrderDetailAPI(prop.idoder)
      .then((res) => {
        if (res.msg === "ok") {
          newRes = { ...newRes, detail: res.result };
        }
      })
      .then(async () => {
        // Get  fee ship code
        if (prop.idShipcode) {
          await getShipCodeWithID(prop.idShipcode)
            .then((res) => {
              if (res.msg === "ok") {
                newRes = { ...newRes, shipcode: res.result[0] };
              }
            })
            .catch((er1) => {
              console.log("er", er1);
            });
        }
      })
      .then(async () => {
        // Get  Discount
        if (prop.idDisscount) {
          await getDiscountWithID(prop.idDisscount)
            .then((res) => {
              if (res.msg === "ok") {
                newRes = { ...newRes, discount: res.result[0] };
              }
            })
            .catch((er1) => {
              console.log("er", er1);
            });
        }
      })
     
      .then(() => {
        setOpen(true);
        setDetailOrder(newRes);
      })
      .catch((er) => {
        console.log("er", er);
      });
  };
  // Load Cus
  const loadCusAgain = async () => {
    const res = await loadCustomer();
    actionProducts.handleSetCustomer(res);
  };

  const onEnter = (r) => {
    console.log("r", r);
  };
  const cancelOrder = async (data) => {
    // console.log(data);
    // console.log("Enter", detailOrder);

    setOpenCancel(false);
    await setCancelOrder({ id: detailOrder.order.idoder, text: data })
      .then((res) => {
        console.log(res);
        if (res) {
          initData();
          // handleDeleteAuthor({ NameAuthor: data.NameAuthor, idoder: data.idoder });
        } else {
          throw new Error("Failed to delete user");
        }
      })
      .then(() => {
        // Show message success
        Swal.fire({
          // position: 'top-end',
          icon: "success",
          title: "Cancel Order!!",
          showConfirmButton: false,
          timer: 1500,
        });
        setOpenCancel(false);
      })
      .catch((err) => {
        console.log(err);
        // Show message failed
        Swal.fire({
          // position: 'top-end',
          icon: "error",
          title: "Something error!!",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };
  return (
    <>
      {!customerState.isLogin ? <Redirect to={HOME} /> : ""}
      <ModalDetail open={open} setOpen={(o) => setOpen(o)} dataEdit={detailOrder} onEnter={onEnter} />
      <NavBarDetail />
      <header id="header" class="ex-header">
        <div class="container">
          <div class="row">
            <div class="col-md-12" style={{ justifyContent: "center", margin: "auto", maxWidth: "70%", display: "flex", justifyItems: "center" }}></div>
            {/* <!-- end of col --> */}
          </div>
          {/* <!-- end of row --> */}
        </div>
        {/* <!-- end of container --> */}
      </header>

      <Content customerState={customerState} orderState={orderState} getDetailOrder={getDetailOrder} loadCusAgain={loadCusAgain} openCancel={openCancel}setOpenCancel={setOpenCancel}cancelOrder={cancelOrder}/>
    </>
  );
};

const mapStateToProps = (state) => ({
  customerState: state.customer,
  // cartState: state.cartList.data,
  // shipCodeState:state.shipCode.data,
});
const mapDispatchToProps = (dispatch) => ({
  actionProducts: bindActionCreators({ ...actionProduct }, dispatch),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect)(Personal);
