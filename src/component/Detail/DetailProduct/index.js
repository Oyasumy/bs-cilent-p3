import React from 'react'
// import "./style.css"
const ShowDetail = () => {
    return (
        <div class="card">
            <div id="shopping">
                <i class="fas fa-cart-plus"><sup id="items-added"></sup></i>
            </div>
            <div class="images">
                <h2>NOMOS LUX Glashütte</h2>
                <div class="slider"><img id="big-image" src="images/Nomos1.webp" alt=""/></div>
                <div id="img-slider" class="img-slider">
                    <div class="imgs"><img id="Nomos1" src="images/Nomos1.webp" alt=""/></div>
                    <div class="imgs"><img id="Nomos2" src="images/Nomos2.webp" alt=""/></div>
                    <div class="imgs"><img id="Nomos3" src="images/Nomos3.webp" alt=""/></div>
                </div>
            </div>
            <div class="infos">
                <h1>NOMOS LUX Glashütte</h1>
                <div class="reviews">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star-half-alt"></i>
                </div>
                <div class="price">
                    <h3>2100$</h3>
                    <h3>2350$</h3>
                </div>
                <div id="more-infos">
                    <h5 class="choose">Description</h5>
                    <h5 class="choose">Basic Info</h5>
                    <h5 class="choose">Caliber</h5>
                </div>
                <div id="info-content">
                    <p  class="paragraph" style={{display: "block"}}>The watch comes with the original Nomos black Cordovan Shell strap and with the original Nomos 18kt white gold tang buckle. This timepiece is sourced directly from Nomos, hence please allow one week delivery time (often within days).</p>
                    <p class="paragraph" style={{display: "none"}}>CALIBER DUW 2002 manual <br/> MOVEMENT HEIGHT 3.6 mm <br/> DIAMETER 32.6 by 22.6 mm <br/> POWER RESERVE up to 84 hours <br/> JEWELS 23</p>
                    <p class="paragraph" style={{display: "none"}}>Lorem Repellendus ullam odit placeat, non rem eaque. ipsum dolor sit amet consectetur adipisicing elit. Repellendus Repellendus ullam odit placeat, non rem eaque.ullam odit placeat, non rem eaque.</p>
                </div>
                <div class="quantity">
                    <h3>QUANTITY</h3>
                <input type="number" name="items" id="counter" min="1" value="1"/>
            </div>
                <div class="buttons">
                    <button id="add-to-cart"><i class="fas fa-shopping-cart"></i>ADD TO CART</button>
                    <button>BUY NOW</button>
                </div>
            </div>
        </div>

    )
}

export default ShowDetail
