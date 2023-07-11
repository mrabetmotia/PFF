import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const ShopDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [shop, setShop] = useState(null);

  useEffect(() => {
    const fetchShopDetails = async () => {
      try {
        const response = await fetch(`http://localhost:9000/Products/${id}`);
        const shopData = await response.json();
        setShop(shopData);
      } catch (error) {
        console.error(error);
      }
    };

    if (id) {
      fetchShopDetails();
    }
  }, [id]);

  if (!shop) {
    return <div>Loading...</div>;
  }

  return (
    <div className="shop-detail">
      <h1>
        Shop Detail <span>{shop.name}</span>
      </h1>
      <img src={shop.image} alt={shop.name} className="shop-image" />
      {shop.type.name === "protein" && <p style={{ margin: "0" }}>{shop.kg} KG</p>}
      <p>{shop.price} TND</p>
      <p>  {shop.description}</p>
    </div>
  );
};

export default ShopDetail;
