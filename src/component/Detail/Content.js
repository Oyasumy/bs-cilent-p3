import React from "react";
import { Link } from "react-router-dom";
import Search from "../ListProduct/Search";
// import ShowDetail from "./DetailProduct";
import Product from "./Product";

const Content = ({data,samePro}) => {
  return (
    <>
      <Search/>
      {/* <!-- end of ex-header --> */}

      {/* <!-- end of header --> */}
      {/* <Header /> */}
      {/* <!-- Breadcrumbs --> */}
      <div class="ex-basic-1">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="breadcrumbs">
                <Link to="/" link={true}>
                  <a href>Home</a>
                </Link>
                <i class="fa fa-angle-double-right"></i>
                <Link to="/list-product" link={true}>
                  <a href>All Product</a>
                </Link>
                <i class="fa fa-angle-double-right"></i>
                <span>{data?data.NameProduct:""}</span>
              </div>
              {/* <!-- end of breadcrumbs --> */}
            </div>
            {/* <!-- end of col --> */}
          </div>
          {/* <!-- end of row --> */}
        </div>
        {/* <!-- end of container --> */}
      </div>
      {/* <!-- end of ex-basic-1 --> */}

      {/* <!-- end of breadcrumbs --> */}
      {/* <ShowDetail/> */}
      <Product products={data} samePro={samePro}/>
    </>
  );
};

export default Content;
