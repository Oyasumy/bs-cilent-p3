import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Route, Link, useHistory } from "react-router-dom";
import { bindActionCreators, compose } from "redux";
import * as actionModal from "../../actions/modal";
import * as actionBooks from "../../actions/book";
import Swal from "sweetalert2";
import { loadCategory, loadCustomer } from "../../commons/callApi";

const NavBar = ({ isShow, actionModal, customerState, actionBook }) => {
  const history=useHistory();

  useEffect(() => {
    if(customerState.isLogin) return;
    loadCus();
  }, []);
  const loadCus = async () => {
    // Load customer
    await loadCustomer()
      .then((res) => {
        console.log(res);
        if(res){
          actionBook.handleSetCustomer(res)
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
  const ShowModal = () => {
    const { handleShowModal } = actionModal;
    handleShowModal(!isShow);
  };
  // Log out
  const logoutCus = async () => {
    actionBook.handleDeleteCustomer();
    localStorage.removeItem('user')
    Swal.fire({
      // position: 'top-end',
      icon: "success",
      title: "Logout success!!",
      showConfirmButton: false,
      timer: 1500,
    });
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
            <li class="nav-item">
              <a class="nav-link page-scroll" href="#intro">
                INTRO
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link page-scroll" href="#services">
                PRODUCT
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link page-scroll" href="#callMe">
                CALL ME
              </a>
            </li>

            {/* <!-- Dropdown Menu -->           */}
            <li class="nav-item dropdown">
              <a class="nav-link  page-scroll" href="#about">
                ABOUT
              </a>
            </li>

            {/* <!-- end of dropdown menu --> */}

            <MenuLink label="ALL PRODUCT" to="list-product" exactOnlyWhenActive={false} />

            {/* <li class="nav-item">
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
                {/* <li class="nav-item">
                  <a class="nav-link page-scroll" href>
                    <i class="far fa-user"></i> {customerState.isLogin ? customerState.data.NameCustomer : "Hello"}
                  </a>
                </li> */}
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
              <a class="nav-link page-scroll" href onClick={()=>history.push('list-cart')}>
                <i class="fas fa-cart-arrow-down" style={{ fontSize: 23, display: "flex", marginTop: "-5px" }}></i>
              </a>
            </li>
          </ul>
          <span class="nav-item social-icons">
            <span class="fa-stack">
              <a href="#your-link">
                <span class="hexagon"></span>
                {/* <i class="fas fa-luggage-cart fa-stack-1x"></i> */}
                <i class="fab fa-facebook-f fa-stack-1x"></i>
              </a>
            </span>
          </span>
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

export default compose(withConnect)(NavBar);
