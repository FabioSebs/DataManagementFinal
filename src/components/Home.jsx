import React from "react";
import axios from "axios";

const Home = () => {
  // DATASTRUCS
  const product = {
    image: undefined,
    name: undefined,
    rating: undefined,
    review: undefined,
  };

  const productList = [];

  // AXIOS CALL  -- !!!! ADD DATA INTO PRODUCT LIST AS PRODUCT OBJECT !!!!!
  const fetchProducts = async () => {
    try {
      res = await axios.get("localhost:5000/api/products");
    } catch (error) {
      console.log(error);
    }
  };

  return <div className="Gallery">{}</div>;
};

export default Home;
