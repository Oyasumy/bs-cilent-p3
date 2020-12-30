import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Route, Link, useHistory } from "react-router-dom";
import { bindActionCreators, compose } from "redux";
import * as actionModal from "../../actions/modal";
import * as actionBooks from "../../actions/book";
import { loadAllCart, loadCheckShipCode, loadCustomer } from "../../commons/callApi";
import Swal from "sweetalert2";

const NavBarDetail = ({ isShow, actionModal, customerState, actionBook }) => {
  const history = useHistory();

  const ShowModal = () => {
    const { handleShowModal } = actionModal;
    handleShowModal(!isShow);
  };
  // console.log("c",customerState);
  useEffect(() => {
    // if (customerState.isLogin) return;
    loadCus();
  }, []);
  // useEffect(() => {
  //   // if (customerState.isLogin) return;
  //   loadCus();
  // }, [customerState]);

  const loadCus = async () => {
    // Load customer
    await loadCustomer()
      .then(async (res) => {
        console.log(res);
        if (res) {
          // set customer state
          actionBook.handleSetCustomer(res);
          // get cart customer
          const res2 = await loadAllCart(res.CustomerID);
          const { handleSetCart } = actionBook;
          if (res2) {
            
            handleSetCart(res2);
          }
          // get ship code customer
          const addr = res.AddressCustomer.split(",");
          if (addr[1]) {
            const res3 = await loadCheckShipCode(addr[1]);
            console.log("res3", res3);
            const { handleSetShipCode } = actionBook;
            handleSetShipCode(res3.result[0]);
          }
        }
      })

      .catch((err) => {
        Swal.fire({
          // position: 'top-end',
          icon: "error",
          title: "Something went wrong!!",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  // Log out
  const logoutCus = async () => {
    actionBook.handleDeleteCustomer();
    localStorage.removeItem("user");
    Swal.fire({
      // position: 'top-end',
      icon: "success",
      title: "Logout success!!",
      showConfirmButton: false,
      timer: 1500,
    });
    actionBook.handleDeleteShipCode();
  };

  const MenuLink = ({ label, to, exactOnlyWhenActive }) => {
    return (
      <Route
        path={to}
        exact={exactOnlyWhenActive}
        children={({ match }) => {
          //   var active = match ? "active" : "";
          return (
            <li class="nav-item">
              <Link to={to} link={true}>
                <a class="nav-link page-scroll" href>
                  {label}
                </a>
              </Link>
            </li>
          );
        }}
      />
    );
  };
  return (
    <>
      {/* <!-- Navbar --> */}
      <nav class="navbar navbar-expand-md navbar-dark navbar-custom fixed-top">
        {/* <!-- Text Logo - Use this if you don't have a graphic logo --> */}

        {/* <!-- <a class="navbar-brand logo-text page-scroll" href="index.html">Aria</a> --> */}

        {/* <!-- Image Logo --> */}
        <a class="navbar-brand logo-image" href="index.html">
          <img src="client/images/logo.svg" alt="alternative" />
        </a>

        {/* <!-- Mobile Menu Toggle Button --> */}
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-awesome fas fa-bars"></span>
          <span class="navbar-toggler-awesome fas fa-times"></span>
        </button>

        {/* <!-- end of mobile menu toggle button --> */}

        <div class="collapse navbar-collapse" id="navbarsExampleDefault">
          <ul class="navbar-nav ml-auto">
            <MenuLink to="/" exactOnlyWhenActive={false} label="HOME" />

            {/* <li class="nav-item">
              <a class="nav-link page-scroll" href="#header">
                HOME <span class="sr-only">(current)</span>
              </a>
            </li> */}
            {/*  */}

            {/* <!-- end of dropdown menu --> */}

            <MenuLink label="PRODUCT" to="list-product" exactOnlyWhenActive={false} />
            {/* 
            <li class="nav-item">
              <a class="nav-link page-scroll" href="#contact">
                CONTACT
              </a>
            </li> */}
            {customerState.isLogin ? (
              <>
                <li class="nav-item">
                  <Link to="personal" link={true}>
                    <a class="nav-link page-scroll" href>
                      <i class="far fa-user"></i> {customerState.isLogin ? customerState.data.NameCustomer : "Hello"}
                    </a>
                  </Link>
                </li>

                {/* <MenuLink label={customerState.isLogin ? customerState.data.NameCustomer : "Hello"} to="personal" exactOnlyWhenActive={false} /> */}
                <li class="nav-item">
                  <a class="nav-link page-scroll" href onClick={() => logoutCus()}>
                    <i class="fas fa-sign-out-alt"></i> LOGOUT
                  </a>
                </li>
              </>
            ) : (
              <li class="nav-item">
                <a class="nav-link page-scroll" href onClick={() => ShowModal()}>
                  LOGIN
                </a>
              </li>
            )}

            <li class="nav-item">
              <a class="nav-link page-scroll" href onClick={() => history.push("list-cart")}>
                <i class="fas fa-cart-arrow-down" style={{ fontSize: 23, display: "flex", marginTop: "-5px" }}></i>
              </a>
            </li>
          </ul>
        </div>
      </nav>
      {/* <!-- end of navbar --> */}

      {/* <!-- end of navbar --> */}
    </>
  );
};

const mapStateToProps = (state) => ({
  isShow: state.modal.isShow,
  customerState: state.customer,
});
const mapDispatchToProps = (dispatch) => ({
  actionModal: bindActionCreators({ ...actionModal }, dispatch),
  actionBook: bindActionCreators({ ...actionBooks }, dispatch),
});
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(NavBarDetail);
