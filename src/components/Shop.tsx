import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import Link from "next/link";
import {Button} from "@mui/material";

function Shop() {
    const [productData, setProductData] = useState([]);
    const { isLoggedIn } = useAuth();
    const router = useRouter();
  
    useEffect(() => {
      fetchData();
    }, []);

    const fetchData = async () => {
        try {
          const shopResponse = await axios.get("http://localhost:9000/Product");

          setProductData(shopResponse.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

  return (
    <div className="records table-responsive ">
        <div className="products-container-index  ">
          {productData.slice(0, 4).map((product) => (

            <div key={product._id} className="product-item">
              <Link href={`/shop/${product._id}`}>
                <img src={product.image} alt="" />
              </Link>
              <h3>{product.name}</h3>
              {product.type.name === "protein" && (
                <p style={{ margin: "0" }}>{product.kg} KG</p>
              )}
              <p>{product.price} TND</p>
            </div>
          ))}
        </div>
    <Link
        className="Btn-more"
        href="/shop"
    >
      <Button
        variant="contained"
        color="primary"
        size="large"
        className="BTN-More"
      >
        View More
      </Button>
    </Link>
  </div>
  );
}

export default Shop;
