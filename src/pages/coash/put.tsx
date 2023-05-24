import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const EditShopForm = () => {
  const router = useRouter();
  const shopId = router.query.id; // Assuming you get the shop ID from the router

  const [shopData, setShopData] = useState({
    nom: '',
    description: '',
    specialite: '',
    image: '',
    vd: '',
    experience: 0,
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setShopData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.put(`http://localhost:9000/Coachs/${shopId}`, shopData);
      // Handle success, show a success message or navigate to a different page
      toast.success('Shop updated successfully!');
    } catch (error) {
      console.error(error);
      setErrorMessage('Une erreur est survenue lors de la mise à jour du magasin.');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:9000/Coachs/${shopId}`);
        setShopData(response.data);
      } catch (error) {
        console.error(error);
        setErrorMessage('Une erreur est survenue lors de la récupération des données du magasin.');
      }
    };

    fetchData();
  }, [shopId]);

  return (
    <div className="edit-shop-form-container">
      <h1>Modifier le magasin</h1>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nom">Nom :</label>
          <input type="text" id="nom" name="nom" value={shopData.nom} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description :</label>
          <textarea id="description" name="description" value={shopData.description} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="specialite">Spécialité :</label>
          <input type="text" id="specialite" name="specialite" value={shopData.specialite} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image :</label>
          <input type="text" id="image" name="image" value={shopData.image} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="vd">VD :</label>
          <input type="text" id="vd" name="vd" value={shopData.vd} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="experience">Expérience :</label>
          <input type="number" id="experience" name="experience" value={shopData.experience} onChange={handleChange} required />
        </div>
        <button type="submit">Mettre à jour</button>
      </form>

      <style jsx>{`
        .edit-shop-form-container {
          max-width: 800px;
          margin: 10% auto;
        }

        h1 {
          text-align: center;
          margin-bottom: 20px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        label {
          display: block;
          font-weight: bold;
          margin-bottom: 5px;
        }

        input[type='text'],
        textarea,
        input[type='number'] {
          width: 100%;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        button[type='submit'] {
          padding: 5px 10px;
          background-color: #4caf50;
          color: #fff;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        button[type='submit']:hover {
          background-color: #45a049;
        }

        .error-message {
          color: red;
          margin-bottom: 10px;
        }
      `}</style>
    </div>
  );
};

export default EditShopForm;
