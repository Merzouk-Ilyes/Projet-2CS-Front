import React from "react";
import "../../../../styles/Slider.sass";

import {AiOutlineArrowRight ,AiOutlineArrowLeft } from "react-icons/ai"
import {BsArrowLeft} from "react-icons/bs"

export default function BtnSlider({ direction, moveSlide }) {
  console.log(direction, moveSlide);
  return (
    <button
      onClick={moveSlide}
      className={direction === "next" ? "btn-slide next" : "btn-slide prev"}
    >
      
      {direction === "next" ? <AiOutlineArrowRight /> : <AiOutlineArrowLeft />} 
    </button>
  );
}