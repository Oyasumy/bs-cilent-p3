import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import SingleProductCard from "./SingleProductCard";

const NewProduct = ({ books }) => {
  const showProduct = (books) => {
    var result = null;
    result = books.map((pro, i) => {
      return (
        <Grid.Column key={i} style={{ display: "flex", justifyContent: "center" }}>
          <SingleProductCard product={pro} />
        </Grid.Column>
      );
    });
    return result;
  };
  return (
    <>
      {/* <!-- Services --> */}
      <div id="services" class="cards-2">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="section-title">NEW BOOK</div>
              <h2>
                Choose The New Product
                <br /> That Suits Your Needs
              </h2>
            </div>
            {/* <!-- end of col --> */}
          </div>

          {/* <!-- end of row --> */}

          <Grid columns={3} divided style={{ marginTop: "30px" }}>
            <Grid.Row style={{ display: "flex", justifyContent: "center", margin: "auto" }}>{showProduct(books)}</Grid.Row>
          </Grid>

          {/* <!-- end of card --> */}
        </div>

        <div class="button-container">
          <Link to="list-product" link={true}>
            <a class="btn-solid-reg ">
              View More
            </a>
          </Link>
        </div>
        {/* <!-- end of col --> */}
      </div>

      {/* <!-- end of services --> */}
    </>
  );
};

export default NewProduct;
