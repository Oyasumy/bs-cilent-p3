import React from 'react'
import { useHistory } from 'react-router-dom';
import './style.css';
const ListCard = ({product}) => {
  const history = useHistory();
    return (
        <>
          {/* <!--box-slider---------------> */}
          <div class="box" style={{margin:'0px !important',marginBottom:'25px'}}>
            {/* <!--img-box----------> */}
            <div class="slide-img">
              <img alt="1" src={product.images[0]?product.images[0].url:""} style={{objectFit:'contain'}}/>
              {/* <!--overlayer----------> */}
              <div class="overlay">
                {/* <!--buy-btn------> */}
            
                <a onClick={()=>history.push('detail-product',{data:product})} class="buy-btn">Buy Now</a>
              </div>
            </div>
            {/* <!--detail-box---------> */}
            <div class="detail-box">
              {/* <!--type--------> */}
              <div class="type">
                <a onClick={()=>history.push('detail-product',{data:product})}>{product?product.NameProduct:""}</a>
                <span>{product?product.NameAuthor:""}</span>
              </div>
              {/* <!--price--------> */}
              <a onClick={()=>history.push('detail-product',{data:product})} class="price">${product?product.PriceProduct:""}</a>
            </div>
          </div>
       
        </>
    )
}

export default ListCard
