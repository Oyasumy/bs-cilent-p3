import React, { useState } from "react";
import { bindActionCreators, compose } from "redux";
import { Button, Icon, Image, Input, Label } from "semantic-ui-react";
import SameProduct from "./SameProduct";
import * as actionBooks from "../../actions/book";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import { loadAddCart, loadUpdateCart } from "../../commons/callApi";

const Product = ({ products, samePro, actionBook, customerState, cartState }) => {
  const [activeImg, setActiveImg] = useState(products.images[0].url || "./book.jpeg");

  // Show Same Product
  const showSame = (same) => {
    var result = null;
    result = same.map((ele, i) => {
      const { NameProduct, NameAuthor, NameCategory, PriceProduct, images } = ele;
      return (
        <div className="col-md-4">
          <SameProduct name={NameProduct} price={PriceProduct} img={images[0] ? images[0].url : ""} author={NameAuthor} cate={NameCategory} />
        </div>
      );
    });
    return result;
  };

  // handle
  const onAddToCart = async (pro) => {
    // if cus not available
    if (!customerState.isLogin) {
      const { handleAddCart } = actionBook;
      handleAddCart({ ...pro, quantity: 1 });
      Swal.fire({
        // position: 'top-end',
        icon: "success",
        title: "Add success!!",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    } else {
      var ck = cartState.find((e) => e.ProductID === pro.ProductID);
      if (ck) {
        // console.log("update", pro, ck);
        const { CustomerID } = customerState.data;
        var { ProductID, quantity } = ck;
        const newQ = quantity++;
        // console.log("vl",newQ,quantity);
        await loadUpdateCart(CustomerID, ProductID, quantity).then((res) => {
          if (res) {
            const { handleAddCart } = actionBook;
            handleAddCart({ ...pro, quantity: 1 });
            Swal.fire({
              // position: 'top-end',
              icon: "success",
              title: "Add success!!",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
      } else {
        // console.log("add");
        const { CustomerID } = customerState.data;
        await loadAddCart(CustomerID, pro.ProductID, 1)
          .then((res) => {
            if (res) {
              const { handleAddCart } = actionBook;
              handleAddCart({ ...pro, quantity: 1 });
              Swal.fire({
                // position: 'top-end',
                icon: "success",
                title: "Add success!!",
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
    }
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-5">
            <Image src={activeImg} size="large" />
            <Image.Group size="tiny">
              {products
                ? Object.keys(products.images).map((img, i) => {
                    return <Image src={products.images[i].url} onClick={() => setActiveImg(products.images[i].url)} />;
                  })
                : null}
            </Image.Group>
          </div>
          <div className="col-md-7">
            <div className="text-container" style={{ padding: "35px" }}>
              <div className="row">
                <div className="col-md-6">
                  <h3>Book Name: {products.NameProduct}</h3>
                  <Label>
                    Price
                    <Label.Detail>{products.PriceProduct} $</Label.Detail>
                  </Label>
                </div>
              </div>
              <div className="text-container" style={{ marginTop: "15px" }}>
                <div className="row">
                  <div className="col-md-3">
                    <h3>Author</h3>
                    <p>{products.NameAuthor}</p>
                  </div>
                  <div className="col-md-3">
                    <h3>Category</h3>
                    <p>{products.NameCategory}</p>
                  </div>
                </div>
              </div>
              <Button as="div" labelPosition="right" style={{ marginTop: "30px" }} onClick={() => onAddToCart(products)}>
                <Button basic color="blue">
                  <Icon name="fork" />
                  Fork
                </Button>
                <Label as="a" basic color="blue" pointing="left">
                  ADD TO CART
                </Label>
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* <Image src="./book.jpeg" size="large" /> */}
      {/* <!-- Privacy Content --> */}
      <div className="ex-basic-2">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-container">
                <h3>Description</h3>
                <p>{products.DescriptionProduct}</p>
              </div>
              {/* <!-- end of text container --> */}
              <div className="text-container">
                <h3>Same Product</h3>

                <div className="row">{showSame(samePro)}</div>
              </div>
              {/* <!-- end of text-container --> */}
            </div>
            {/* <!-- end of col--> */}
          </div>
          {/* <!-- end of row --> */}
        </div>
        {/* <!-- end of container --> */}
      </div>

      {/* <!-- end of ex-basic-2 --> */}

      {/* <!-- end of privacy content --> */}
    </>
  );
};

const mapStateToProps = (state) => ({
  isShow: state.modal.isShow,
  customerState: state.customer,
  cartState: state.cartList.data,
});
const mapDispatchToProps = (dispatch) => ({
  actionBook: bindActionCreators({ ...actionBooks }, dispatch),
});
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect)(Product);
