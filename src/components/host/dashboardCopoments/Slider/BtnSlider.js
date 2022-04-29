import React from "react";
import "../../../../styles/Slider.sass";
import leftArrow from "../../../../icons/left-arrow.png";
import rightArrow from "../../../../icons/right-arrow.png";
import {AiOutlineArrowRight ,AiOutlineArrowLeft } from "react-icons/ai"

export default function BtnSlider({ direction, moveSlide }) {
  console.log(direction, moveSlide);
  return (
    <button
      onClick={moveSlide}
      className={direction === "next" ? "btn-slide next" : "btn-slide prev"}
    >
      <img src={direction === "next" ? rightArrow : leftArrow} />
    </button>
  );
}