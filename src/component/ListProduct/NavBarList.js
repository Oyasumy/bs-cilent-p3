import React from "react";
import { connect } from "react-redux";
import { Route, Link } from "react-router-dom";
import { bindActionCreators, compose } from "redux";
import * as actionModal from "../../actions/modal";

const NavBar = ({ isShow, actionModal }) => {
  const ShowModal = () => {
    const { handleShowModal } = actionModal;
    handleShowModal(!isShow);
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

            {/* <MenuLink label="PRODUCT" to="detail-product" exactOnlyWhenActive={false} /> */}
            {/* 
            <li class="nav-item">
              <a class="nav-link page-scroll" href="#contact">
                CONTACT
              </a>
            </li> */}
            <li class="nav-item">
              <a class="nav-link page-scroll" href onClick={() => ShowModal()}>
                LOGIN
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link page-scroll" href>
                REGISTER
              </a>
            </li>
          </ul>
          <span class="nav-item social-icons">
            <span class="fa-stack">
              <a href="#your-link">
                <span class="hexagon"></span>
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
});
const mapDispatchToProps = (dispatch) => ({
  actionModal: bindActionCreators({ ...actionModal }, dispatch),
});
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(NavBar);
