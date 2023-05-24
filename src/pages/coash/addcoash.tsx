import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const AddCoachForm = () => {
  const router = useRouter();

  const [coachData, setCoachData] = useState({
    nom: '',
    description: '',
    spesialite: '',
    image: '',
    vd: '',
    experiance: 0,
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCoachData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post('http://localhost:9000/coach', coachData);
      // Handle success, show a success message or navigate to a different page
      toast.success('Insertion réussie ');
      router.push('/coash/');
      

    } catch (error) {
      console.error(error);
      setErrorMessage('Une erreur est survenue lors de l\'ajout du coach.');
    }
  };

  return (
    <div className="add-coach-form-container">
      <h1>Ajouter un coach</h1>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nom">Nom :</label>
          <input type="text" id="nom" name="nom" value={coachData.nom} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description :</label>
          <textarea id="description" name="description" value={coachData.description} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="spesialite">Spécialité :</label>
          <input type="text" id="spesialite" name="spesialite" value={coachData.spesialite} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image :</label>
          <input type="text" id="image" name="image" value={coachData.image} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="vd">VD :</label>
          <input type="text" id="vd" name="vd" value={coachData.vd} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="experiance">Expérience :</label>
          <input type="number" id="experiance" name="experiance" value={coachData.experiance} onChange={handleChange} required />
        </div>
        <button type="submit">Ajouter</button>
      </form>

      <style jsx>{`
        .add-coach-form-container {
          max-width: 800px;
          margin: 10% auto;
        }

        form {
          margin-top: 20px;
        }

        .form-group {
          margin-bottom: 10px;
        }

        label {
          display: block;
        }

        input,
        textarea {
          width: 100%;
          padding: 5px;
          border: 1px solid #ccc;
        }

        button {
          padding: 5px 10px;
          background-color: #ff5555;
          color: #fff;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        button:hover {
          background-color: #ff3333;
        }

        .error-message {
          color: red;
          margin-bottom: 10px;
        }
      `}</style>
    </div>
  );
};

export default AddCoachForm;
