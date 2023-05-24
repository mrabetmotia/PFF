import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddShopForm = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [kg, setKg] = useState('');
  const [price, setPrice] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:9000/shops', {
        name,
        image,
        kg,
        price,
      });

      console.log(response.data); // Afficher la réponse du serveur si nécessaire
      // Réinitialiser le formulaire après une soumission réussie
      setName('');
      setImage('');
      setKg('');
      setPrice('');
      setErrorMessage('');
      toast.success('Insertion réussie ');

    } catch (error) {
      console.error(error);
      setErrorMessage('Une erreur est survenue lors de l\'ajout du magasin.');
    }
  };

  return (
    <div className="form-container">
      <h1>Ajouter un Produit</h1>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nom:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Image:</label>
          <input type="text" value={image} onChange={(e) => setImage(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Poids (kg):</label>
          <input type="text" value={kg} onChange={(e) => setKg(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Prix:</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </div>
        <button type="submit">Ajouter</button>
      </form>

      <style jsx>{`
        .form-container {
          max-width: 400px;
          margin: 10% auto;
        }

        .form-group {
          margin-bottom: 10px;
        }

        label {
          display: block;
          margin-bottom: 5px;
        }

        input[type="text"],
        input[type="number"] {
          width: 100%;
          padding: 5px;
          border: 1px solid #ccc;
          border-radius: 3px;
        }

        button[type="submit"] {
          background-color: #4caf50;
          color: white;
          border: none;
          padding: 10px 20px;
          text-align: center;
          text-decoration: none;
          display: inline-block;
          font-size: 16px;
          border-radius: 5px;
          cursor: pointer;
        }

        .error-message {
          color: red;
          margin-bottom: 10px;
        }
      `}</style>
    </div>
  );
};

export default AddShopForm;
