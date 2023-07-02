import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import jwt_decode from "jwt-decode";

const Panier = () => {
  const { isLoggedIn, user } = useAuth();
  const { cart, removeFromCart } = useContext(CartContext);
  const router = useRouter();

  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  const [formData, setFormData] = useState({
    nom_user: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwt_decode(token);
        setFormData({
          email: decoded.email || "",
          nom_user: decoded.first_name || "",
          phone: decoded.phone || "",
        });
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [isLoggedIn, router, user]);

  const addCommande = () => {
    cart.forEach((item) => {
      axios
        .post("http://localhost:9000/Commande", {
          name_user: formData.nom_user,
          email: formData.email,
          phone: formData.phone,
          name: item.name, // send name of the item
          image_produit: item.image, // send image of the item
          totalPrice: item.price, // send price of the item
        })
        .then((response) => {
          console.log("Commande added successfully!");
          toast.success("Commande added successfully!");
        })
        .catch((error) => {
          console.error("Error adding Commande:", error);
          toast.error("error in Commande added !");
        });
    });
  };

  return (
    <div className="panier-container">
      <h1>Mon Panier</h1>
      <label className="panier_detail">{formData.nom_user}</label>
      <label className="panier_detail">{formData.email}</label>
      <label className="panier_detail">{formData.phone}</label>
      <ul className="item-list">
        {cart.map((item) => (
          <li key={item._id} className="item">
            <img src={item.image} alt="" className="item-image" />
            <span className="item-name">{item.name}</span>
            <span className="item-price">{item.price} €</span>
            <button
              onClick={() => removeFromCart(item._id)}
              className="remove-button"
            >
              Supprimer
            </button>
          </li>
        ))}
      </ul>
      <div className="total-price">Total: {totalPrice} €</div>
      <button onClick={addCommande} className="remove-button add-commande">
        Add Commande
      </button>
    </div>
  );
};

export default Panier;
