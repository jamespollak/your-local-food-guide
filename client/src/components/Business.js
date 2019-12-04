import React from "react";
import { Link } from "react-router-dom";

function Business(props) {
  return (
    <div className="business-layout">
      <h3>{props.name}</h3>
      <h2>{props.rating}</h2>
      <img className="business-image" src={props.image_url} alt="" />
    </div>
  );
}

export default Business;
