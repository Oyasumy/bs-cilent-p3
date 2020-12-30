import React from "react";
import AwesomeSlider from "react-awesome-slider";
// import styles from "../../App.css";
const Carousel = () => {
  return (
    <>
      <AwesomeSlider animation="cubeAnimation">
        <div data-src="client/images/carousel/c1.jpg" />
        <div data-src="client/images/carousel/c2.jpg" />
        <div data-src="client/images/carousel/c3.jpg" />
      </AwesomeSlider>
    </>
  );
};

export default Carousel;
