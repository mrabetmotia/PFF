import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,Button,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle } from '@mui/material';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

import {useRouter} from "next/router";
const Panier = () => {
  const [items, setItems] = useState([
    { id: 1, name: 'Produit 1', price: 10 },
    { id: 2, name: 'Produit 2', price: 15 },
    { id: 3, name: 'Produit 3', price: 20 },
  ]);
  const { isLoggedIn } = useAuth()
  const router = useRouter();
  const totalPrice = items.reduce((total, item) => total + item.price, 0);

  const removeItem = (id:any) => {
    setItems(items.filter((item) => item.id !== id));
  };
  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn, router]);
  return (
    <div className="panier-container">
      <h1>Mon Panier</h1>
      <ul className="item-list">
        {items.map((item) => (
          <li key={item.id} className="item">
            <span className="item-name">{item.name}</span>
            <span className="item-price">{item.price} €</span>
            <button onClick={() => removeItem(item.id)} className="remove-button">Supprimer</button>
          </li>
        ))}
      </ul>
      <div className="total-price">Total: {totalPrice} €</div>
      <button  className="remove-button add-commande">Add Commande</button>

    </div>
  );
};

export default Panier;
