import React, {useState, useEffect} from "react";
import LeftBar from "./LeftBar";
import Content from "./Content";

function Main({ data }) {

  const {
    id,
    title,
    image,
    subtitle,
    brand,
    reviews,
    retailer,
    details,
    tags,
    sales,
  } = data[0];

  console.log( id,
    title,
    image,
    subtitle,
    brand,
    reviews,);
  return <div className="main-content">
        
    <LeftBar title={title} image={image} subtitle = {subtitle} tags={tags} />
    <Content sales={sales} data={data}/>
  </div>;
}

export default Main;
