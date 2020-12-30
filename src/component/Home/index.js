import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
// import LoginAndRegister from '../LoginAndRegis'
import About from "./About";
import CallMe from "./CallMe";
import Carousel from "./Carousel";
import CopyRight from "./CopyRight";
import HeaderHome from "./HeaderHome";
import Intro from "./Intro";
import NavBar from "./NavBar";

// import NavBar from './NavBar'
import NewProduct from "./NewBook";
import ShouldProduct from "./ShouldProduct";
import Testimonial from "./Testimonial";

//
import * as actionProduct from "../../actions/book";
import { loadAuthor, loadCategory, loadData } from "../../commons/callApi";
import axios from "axios";
// import { Redirect } from "react-router-dom";
const HomePage = ({ actionProducts, productState }) => {
  const [newBooks, setNewBooks] = useState([]);
  const [shouldBooks, setShouldBooks] = useState([]);
  const { handleSetProducts, handleSetAuthors, handleSetCategories } = actionProducts;
  useEffect(() => {
    initData();
  }, []);

  useEffect(() => {
    setShouldBooks(productState.slice(4, 7));
    setNewBooks(productState.slice(0, 3));
  }, [productState]);
  // load data
  const initData = async () => {
    // Load books
    const resB = await loadData();
    if (resB) {
      handleSetProducts(resB);
    }
    // Load Author
    const resA = await loadAuthor();
    if (resA) {
      handleSetAuthors(resA);
    }
    // Load Category
    const resC = await loadCategory();
    if (resC) {
      handleSetCategories(resC);
    }
  };

  return (
    <>
      <NavBar />
      <HeaderHome />
      <Intro />
      {/* <Description/> */}
      {/* <Carousel /> */}
      <NewProduct books={newBooks} />
      <ShouldProduct books={shouldBooks} />
      {/* <Detail1/>
           <Detail2/> */}
      <Testimonial />
      <CallMe />
      <About />
      <CopyRight />
    </>
  );
};

const mapStateToProps = (state) => ({
  productState: state.productList.data,
});
const mapDispatchToProps = (dispatch) => ({
  actionProducts: bindActionCreators({ ...actionProduct }, dispatch),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect)(HomePage);
