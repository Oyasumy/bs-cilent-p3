import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import Content from "./Content";
import NavBarDetail from "./NavBarDetail";

const DetailProduct = (props) => {
  const [samePro, setSamePro] = useState([]);
  //
  const { productState } = props;
  //
  useEffect(() => {
    const sm = productState.filter((a) => a.NameAuthor.includes(props.location.state.data.NameAuthor)&& a.ProductID!==props.location.state.data.ProductID);
    setSamePro(sm.slice(0,3));
  }, []);
  return (
    <>
      <NavBarDetail />
      <Content data={props.location.state.data} samePro={samePro} />
    </>
  );
};

const mapStateToProps = (state) => ({
  productState: state.productList.data,
  authorState: state.authorList.data,
  cateState: state.categoryList.data,
});

const withConnect = connect(mapStateToProps, null);
export default compose(withConnect)(DetailProduct);
