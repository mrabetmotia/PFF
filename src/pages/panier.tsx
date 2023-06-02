import React from 'react';

const Panier = ({ items }) => {
  if (!items || items.length === 0) {
    return <div>Aucun article dans le panier</div>;
  }

  const totalPrice = items.reduce((total, item) => total + item.price, 0);

  const removeItem = (id) => {
    // Mettez ici votre logique pour supprimer un article du panier
  };

  return (
    <div className="panier-container">
      <h1>Mon Panier</h1>
      <ul className="item-list">
        {items.map((item) => (
          <li key={item.id} className="item">
            <span className="item-name">{item.name}</span>
            <span className="item-price">{item.price} €</span>
            <button onClick={() => removeItem(item.id)} className="remove-button">
              Supprimer
            </button>
          </li>
        ))}
      </ul>
      <div className="total-price">Total: {totalPrice} €</div>
    </div>
  );
};

export default Panier;
