import React, { useState, useEffect } from "react";
import axios from "axios";
import amazonIMG from "../images/fakeamazonlogo.jpg";
import "../styles/home.css"
import Navbar from "./Navbar";

const Products = () => {
  let [productName, setProductName] = useState([])


  const productList = [];

  // AXIOS CALL  -- !!!! ADD DATA INTO PRODUCT LIST AS PRODUCT OBJECT !!!!!
  const fetchProducts = async () => {
    try {
      const productList = []
      const res = await axios.get("http://localhost:5000/api/products");
      console.log(res.data)

      for (let x = 0; x <= 30; x++) {
        productList.push(res.data[x])
      }
      setProductName(productList)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <>
      <Navbar />
      <div className="Gallery">
        {productName ?
          productName.map((prod) => {
            return (
              <div className="products">
                <h3 className="title"> {prod.name}</h3>
                <img src={amazonIMG} alt="amazonprod" height={200} width={200} />
                <h5 className="price"> {`$${Math.floor(Math.random() * 100)}.99`} </h5>
                <h6 className="asin"> {prod.asin}</h6>
              </div>
            )
          })
          : undefined
        }
      </div>
    </>
  )
};

export default Products;
