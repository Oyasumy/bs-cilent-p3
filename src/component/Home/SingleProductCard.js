import React from "react";
import {useHistory} from 'react-router-dom'
const SingleProductCard = ({ product }) => {
  const history = useHistory();
  return (
    <>
      <div class="card">
        <div class="card-image">
          <img class="img-fluid" src={Object.keys(product.images).length > 0 ? product.images[0].url : ""} alt="alternative" />
        </div>
        <div class="card-body">
          <h3 class="card-title">{product.NameProduct}</h3>
          <p style={{ maxHeight: "300px", textOverflow: "clip" }}>{product.DescriptionProduct ? product.DescriptionProduct.slice(0, 100) : ""}...</p>
          <ul class="list-unstyled li-space-lg">
            <li class="media">
              <i class="fas fa-square"></i>
              <div class="media-body">Author: {product.NameAuthor}</div>
            </li>
            <li class="media">
              <i class="fas fa-square"></i>
              <div class="media-body">Category: {product.NameCategory}</div>
            </li>
          </ul>
          <p class="price">
            Starting at <span>$ {product.PriceProduct}</span>
          </p>
        </div>
        <div class="button-container">
          <button class="btn-solid-reg page-scroll"  onClick={()=>history.push('detail-product',{data:product})}>
            DETAILS
          </button>
        </div>
      </div>
    </>
  );
};

export default SingleProductCard;
