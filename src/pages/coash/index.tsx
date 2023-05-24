import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const CoachList = () => {
  const router = useRouter();

  const [coaches, setCoaches] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const handleAddCoashClick = () => {
    router.push('/coash/addcoash');
  };
  useEffect(() => {
    const fetchCoaches = async () => {
      try {
        const response = await axios.get('http://localhost:9000/coachs');
        setCoaches(response.data);
      } catch (error) {
        console.error(error);
        setErrorMessage('Une erreur est survenue lors de la récupération des coachs.');
      }
    };

    fetchCoaches();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:9000/coachs/${id}`);
      setCoaches((prevCoaches) => prevCoaches.filter((coach) => coach._id !== id));
    } catch (error) {
      console.error(error);
      setErrorMessage('Une erreur est survenue lors de la suppression du coach.');
    }
  };

  const handleEdit = (id) => {
    // Handle the edit functionality
    // You can navigate to a different page or show a modal to edit the coach
    console.log(`Editing coach with ID: ${id}`);
  };

  return (
    <div className="coach-list-container">
      <h1>Liste des coachs</h1>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>description</th>
            <th>spesialite</th>
            <th>image</th>
            <th>vd</th>
            <th>experiance</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {coaches.map((coach) => (
            <tr key={coach._id}>
              <td>{coach.nom}</td>
              <td>{coach.description}</td>
              <td>{coach.spesialite}</td>
              <td>{coach.image}</td>
              <td>{coach.vd}</td>             
              <td>{coach.experiance}</td>
              <td>
                <button onClick={() => handleEdit(coach._id)}>Modifier</button>
                <button onClick={() => handleDelete(coach._id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleAddCoashClick}>Ajouter un magasin</button>

      <style jsx>{`
        .coach-list-container {
          max-width: 800px;
          margin: 10% auto;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }

        th,
        td {
          padding: 10px;
          text-align: left;
          border-bottom: 1px solid #ccc;
        }

        button {
          padding: 5px 10px;
          margin-right: 5px;
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

export default CoachList;
